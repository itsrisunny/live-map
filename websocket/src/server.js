const WebSocket = require("ws");
const { PORT } = require("./config/env");
const initLocationSocket = require("./sockets/location.socket");
const logger = require("./utils/logger");

const wss = new WebSocket.Server({ port: PORT });

initLocationSocket(wss);

logger.info(`WebSocket server running on ws://localhost:${PORT}`);
