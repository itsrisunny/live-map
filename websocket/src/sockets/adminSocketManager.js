const WebSocket = require("ws");

const adminClients = new Set();

/**
 * Register Admin Client
 */
function registerAdmin(ws) {
  adminClients.add(ws);
}

/**
 * Remove Admin Client
 */
function removeAdmin(ws) {
  adminClients.delete(ws);
}

/**
 * Broadcast to all admins
 */
function broadcastToAdmins(payload) {
  adminClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(payload));
    }
  });
}

module.exports = {
  registerAdmin,
  removeAdmin,
  broadcastToAdmins,
};