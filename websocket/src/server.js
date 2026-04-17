const http = require("http");
const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");
const { PORT } = require("./config/env");
const initLocationSocket = require("./sockets/location.socket");
const initAdminSocket = require("./sockets/adminSocket");
const logger = require("./utils/logger");

const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());
app.use(cors());
// Register API routes
app.use("/api/auth", authRoutes);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

initAdminSocket(wss);
initLocationSocket(wss);

server.listen(PORT, () => {
  logger.info(`WebSocket server running on port ${PORT}`);
});
