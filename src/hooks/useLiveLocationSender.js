import { useEffect } from "react";
import { WS_URL } from "../utils/constants";

// helper: move current towards target
const moveTowards = (current, target, step) => {
  if (Math.abs(target - current) <= step) return target;
  return current + Math.sign(target - current) * step;
};

const useLiveLocationSender = (enabled) => {
  useEffect(() => {
    if (!enabled) return;

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("🟢 WebSocket connected (ROUTE MOVE)");
    };

    // 🟢 PICKUP (start)
    let lat = 12.9716;
    let lng = 77.5946;

    // 🔴 DROP (target)
    const targetLat = 12.9121;
    const targetLng = 77.6446;

    // ⚡ SPEED (increase = faster)
    const STEP = 0.001;      // distance per tick
    const INTERVAL = 700;    // ms

    const intervalId = setInterval(() => {
      lat = moveTowards(lat, targetLat, STEP);
      lng = moveTowards(lng, targetLng, STEP);

      const payload = { lat, lng };
      console.log("🚗 MOVING TO DROP", payload);

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(payload));
      }

      // 🏁 stop when reached drop
      if (lat === targetLat && lng === targetLng) {
        console.log("🏁 Reached drop location");
        clearInterval(intervalId);
      }
    }, INTERVAL);

    return () => {
      clearInterval(intervalId);
      ws.close();
      console.log("🔴 WebSocket closed (ROUTE MOVE)");
    };
  }, [enabled]);
};

export default useLiveLocationSender;
