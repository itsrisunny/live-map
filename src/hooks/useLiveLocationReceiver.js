import { useEffect, useState } from "react";
import { WS_URL } from "../utils/constants";

const useLiveLocationReceiver = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("🟢 WebSocket connected (viewer)");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📥 RECEIVED LOCATION", data);

        // ✅ validate data before setting
        if (
          typeof data.lat === "number" &&
          typeof data.lng === "number"
        ) {
          setLocation({
            lat: data.lat,
            lng: data.lng,
          });
        }
      } catch (err) {
        console.error("❌ Invalid WebSocket message", err);
      }
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error (viewer)", err);
    };

    return () => {
      ws.close();
      console.log("🔴 WebSocket closed (viewer)");
    };
  }, []);

  return location;
};

export default useLiveLocationReceiver;
