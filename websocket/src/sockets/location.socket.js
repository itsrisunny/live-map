const WebSocket = require("ws");
const logger = require("../utils/logger");
const controller = require("../controllers/location.controller");
const { broadcastToAdmins } = require("./adminSocketManager");


const getEnvironmentFromHost = (host) => {
  if (!host) return "dev_env"; 
  
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return "dev_env";
  }
  
  if (host.includes("api-dev.track.yeapnigaadi.com")) {
    return "dev_env";
  }
  
  if (host.includes("api.track.yeapnigaadi.com")) {
    return "prod_env";
  }

  if (host.includes("run.app")) {
    return "dev_env";
  }
  
  return null;
};


const initLocationSocket = (server) => {
  server.on("connection", (ws, req) => {
    const host = req.headers.host;
    ws.env = getEnvironmentFromHost(host);
    logger.info(`Client connected to ${ws.env} environment`);

    ws.rideId = null;

    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message.toString());
        /**
         * STEP 1 — Subscribe to Ride
         */
        if (data.rideId && !ws.rideId) {
          ws.rideId = data.rideId;

          const ride = await controller.subscribeToRide(ws.rideId, ws.env);

          if (!ride) {
            ws.send(JSON.stringify({ error: "Ride not found" }));
            return;
          }

          ws.send(JSON.stringify({
            type: "rideDetails",
            data: ride,
          }));

          return;
        }

        if (!ws.rideId) {
          ws.send(JSON.stringify({ error: "Ride not subscribed" }));
          return;
        }

        /**
         * STEP 2 — Location Update
         * Expected payload:
         * {
         *   type: "locationUpdate",
         *   lat: number,
         *   lng: number
         * }
         */
        if (data.type === "locationUpdate") {
          const updatedLocation =
            await controller.handleLocationUpdate(ws.rideId, data, ws.env);

          if (updatedLocation) {
            broadcastToRide(server, ws.rideId, {
              type: "locationUpdate",
              data: updatedLocation,
            });

            broadcastToAdmins({
              type: "driverLocation",
              data: {
                rideId: ws.rideId,
                lat: updatedLocation.lat,
                lng: updatedLocation.lng,
                updatedAt: new Date().toISOString(),
              },
            });
          }

          return;
        }

        /**
         * STEP 3 — Status Update
         * Expected payload:
         * {
         *   type: "statusUpdate",
         *   status: -1 | 0 | 1 | 2
         * }
         */
        if (data.type === "statusUpdate") {
          const updatedStatus = await controller.handleStatusUpdate(ws.rideId, data.status, ws.env);

          if (updatedStatus) {
            broadcastToRide(server, ws.rideId, {
              type: "statusUpdate",
              data: updatedStatus,
            });
          }

          return;
        }

      } catch (err) {
        logger.error("Invalid message received", err);
        ws.send(JSON.stringify({ error: "Invalid payload" }));
      }
    });

    ws.on("close", () => {
      logger.info("Client disconnected");
    });

    ws.on("error", (err) => {
      logger.error("WebSocket error:", err);
    });
  });
};

/**
 * Helper — Broadcast to all clients of same ride
 */
function broadcastToRide(server, rideId, payload) {
  server.clients.forEach((client) => {
    if (
      client.readyState === WebSocket.OPEN &&
      client.rideId === rideId
    ) {
      client.send(JSON.stringify(payload));
    }
  });
}

module.exports = initLocationSocket;
