# 📡 Live Location Tracking – Backend (WebSocket)

This backend is a structured **WebSocket server** responsible for receiving
live location updates from a driver and broadcasting them to all connected viewers
in real time.

The project follows a **controller–service–socket architecture** to keep the codebase
clean, scalable, and easy to maintain.

---

## ✨ Features

- 🔌 Real-time communication using WebSockets
- 📍 Receives live latitude and longitude from the sender
- 📢 Broadcasts location updates to all connected clients
- 🧱 Modular architecture (config, controllers, services, sockets)
- ⚡ Lightweight and low-latency
- 🧪 Suitable for local development and demos

---

## 🛠 Tech Stack

- Node.js
- `ws` (WebSocket library)
- Environment-based configuration
- Custom logger utility

---

## 📂 Folder Structure

```

websocket/
├── node_modules/
├── src/
│   ├── config/
│   │   └── env.js
│   ├── controllers/
│   │   └── location.controller.js
│   ├── services/
│   │   └── location.service.js
│   ├── sockets/
│   │   └── location.socket.js
│   ├── utils/
│   │   └── logger.js
│   └── server.js
├── .env
├── package.json
└── README.md

````

---

## 🧠 Architecture Overview

- **server.js**
  - Application entry point
  - Initializes the WebSocket server
  - Loads environment configuration

- **sockets/**
  - Handles WebSocket connections and events
  - Manages client connections and message flow

- **controllers/**
  - Acts as a bridge between socket events and business logic

- **services/**
  - Contains core business logic (location processing, broadcasting)

- **config/**
  - Environment and configuration management

- **utils/**
  - Shared utilities such as logging

---

## 🔑 Environment Configuration

Create a `.env` file in the `websocket` root directory:

```env
PORT=8080
NODE_ENV=development
````

---

## ▶️ Installation

Navigate to the `websocket` folder and install dependencies:

```bash
npm install
```

---

## ▶️ Run the Server

```bash
node src/server.js
```

The WebSocket server will start on:

```
ws://localhost:8080
```

---

## 🔄 Data Flow (How It Works)

1. A **sender (driver)** connects to the WebSocket server
2. The sender sends location updates as JSON
3. The socket layer receives the message
4. The controller processes the request
5. The service handles broadcasting
6. All connected viewers receive the update in real time

---

## 📡 WebSocket Message Format

All location updates must follow this format:

```json
{
  "lat": 12.9716,
  "lng": 77.5946
}
```
