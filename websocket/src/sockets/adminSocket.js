const logger = require("../utils/logger");
const {
  registerAdmin,
  removeAdmin,
} = require("./adminSocketManager");

const initAdminSocket = (server) => {
  server.on("connection", (ws) => {
    ws.isAdmin = false;

    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());

        /**
         * Admin Registration
         */
        if (data.role === "admin" || data.role === "fleet-operator" || data.role === "consumer") {
          ws.isAdmin = true;
          registerAdmin(ws);

          logger.info(data.role);

          ws.send(JSON.stringify({
            type: "connected",
            message: `${data.role} connected successfully`,
          }));

          return;
        }

      } catch (err) {
        logger.error("Admin socket error:", err);
        ws.send(JSON.stringify({ error: "Invalid payload" }));
      }
    });

    ws.on("close", () => {
      if (ws.isAdmin) {
        removeAdmin(ws);
        logger.info(`${data.role} disconnected`);
      }
    });

    ws.on("error", (err) => {
      logger.error("Admin WS error:", err);
    });
  });
};

module.exports = initAdminSocket;