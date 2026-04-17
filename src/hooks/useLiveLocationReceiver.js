import { useEffect, useState } from "react";
import { WS_URL } from "../utils/constants";

const useLiveLocationReceiver = (rideId) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!rideId) return;

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("🟢 WebSocket connected (viewer)");

      // ✅ subscribe to ride
      ws.send(
        JSON.stringify({
          rideId,
        })
      );
    };

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);

        console.log("📥 RECEIVED", parsed);
        if (
          parsed.type === "locationUpdate" &&
          typeof parsed.data?.lat === "number" &&
          typeof parsed.data?.lng === "number"
        ) {
          setLocation({
            lat: parsed.data.lat,
            lng: parsed.data.lng,
          });
        }
      } catch (err) {
        console.error("❌ Invalid WebSocket message", err);
      }
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error", err);
    };

    ws.onclose = () => {
      console.log("🔴 WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [rideId]);

  return location;
};

export default useLiveLocationReceiver;
