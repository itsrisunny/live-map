const WebSocket = require("ws");
const logger = require("../utils/logger");
const controller = require("../controllers/location.controller");
const locationService = require("../services/location.service");

const initLocationSocket = (server) => {
  server.on("connection", (ws) => {
    logger.info("Client connected");

    // Send last known location to new client
    const lastLocation = locationService.getLocation();
    if (lastLocation) {
      ws.send(JSON.stringify(lastLocation));
    }

    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());
        const validData = controller.handleLocationUpdate(data);

        if (validData) {
          server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(validData));
            }
          });
        }
      } catch (err) {
        logger.error("Invalid message received");
      }
    });

    ws.on("close", () => {
      logger.info("Client disconnected");
    });
  });
};

module.exports = initLocationSocket;
