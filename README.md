# 🚗 Live Location Tracking – Frontend

This is the frontend of a real-time live location tracking application built using **React** and **Mapbox**.
It allows a user to share a tracking URL so others can view the driver’s live location on a map.

---

## ✨ Features

- 📍 Pickup and Drop locations via URL query parameters
- 🗺 Mapbox map with route visualization
- 🚗 Live driver tracking using WebSocket
- 🔗 Shareable tracking URL
- 🎨 Glassy UI with gradient header
- 📐 Automatic map bounds adjustment (pickup + drop + live driver)

---

## 🛠 Tech Stack

- React (Create React App)
- Mapbox GL JS
- react-map-gl
- WebSocket (browser)
- Custom React Hooks
- Atomic Design component structure

---

## 📂 Project Structure

```

src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── hooks/
├── utils/
├── pages/
├── routes/
└── App.jsx

````

---

## 🔑 Environment Setup

Create a `.env` file in the project root directory:

```env
REACT_APP_MAPBOX_TOKEN=YOUR_MAPBOX_ACCESS_TOKEN
````

You can generate a token from:
[https://www.mapbox.com/](https://www.mapbox.com/)

---

## ▶️ Installation & Run

```bash
npm install
npm start
```

The application will start at:

```
http://localhost:3000
```

---

## 🔗 Usage

### 🚘 Sender (Driver)

Open the following URL on a mobile device or browser:

```
http://localhost:3000/map?pickupLat=12.9716&pickupLng=77.5946&dropLat=12.9121&dropLng=77.6446
```

* Allow location access
* The driver’s live location will be sent through WebSocket

---

### 👨‍👩‍👧 Viewer (Family / Friends)

Open the following URL on any device:

```
http://localhost:3000/map?pickupLat=12.9716&pickupLng=77.5946&dropLat=12.9121&dropLng=77.6446#viewer
```

* No location permission required
* View the driver’s live movement on the map

---

## 🧪 Development Notes

* Auto-move mode is enabled for local testing without GPS
* Map bounds automatically update on live location changes
* Recommended testing setup:

  * Sender → Mobile phone
  * Viewer → Laptop / Desktop

