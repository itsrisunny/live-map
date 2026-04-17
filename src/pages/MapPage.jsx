import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TrackingMap from "../components/organisms/TrackingMap";
import Loader from "../components/atoms/Loader/Loader";
import ErrorDisplay from "../components/atoms/ErrorDisplay";
import { WS_URL } from "../utils/constants";

const MapPage = () => {
  const { trackID } = useParams();

  const [rideData, setRideData] = useState(null);
  const [liveLocation, setLiveLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!trackID) {
      setError("Invalid tracking ID");
      return;
    }

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          rideId: trackID,
        })
      );
    };

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        console.log("Received WebSocket message:", parsed);

        if (parsed.error) {
          setError("Invalid tracking ID");
          setLoading(false);
          return;
        }

        if (parsed.type === "rideDetails") {
          setRideData(parsed.data);
          setLoading(false);
          return;
        }

        if (
          parsed.type === "locationUpdate" &&
          typeof parsed.data?.lat === "number" &&
          typeof parsed.data?.lng === "number"
        ) {
          setLiveLocation({
            lat: parsed.data.lat,
            lng: parsed.data.lng,
          });
          return;
        }

        if (parsed.type === "statusUpdate") {
          setRideData((prev) => ({
            ...prev,
            rideStatus: parsed.data.rideStatus,
          }));
          return;
        }

      } catch (err) {
        console.error("Invalid WebSocket message");
      }
    };


    ws.onerror = () => {
      setError("WebSocket connection failed");
      setLoading(false);
    };

    ws.onclose = () => {
      console.log("🔴 WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [trackID]);

  if (loading) return <Loader text="Loading tracking..." />;
  if (error) return <ErrorDisplay error={error} />;
  if (!rideData) return <ErrorDisplay error="Ride not found" />;

  const geoPoint = (point) =>
    point
      ? { lat: point._latitude, lng: point._longitude }
      : null;

  const driverLocation =
    liveLocation ||
    geoPoint(rideData.driverCurrentLocation);
  const pickupPoint = geoPoint(rideData.requestedPickupPoint);
  const dropPoint = geoPoint(rideData.requestedDropPoint);

  if (!driverLocation || !pickupPoint || !dropPoint) {
    return <ErrorDisplay error="Location data unavailable" />;
  }

  let pickup = null;
  let drop = null;
  let message = "";

  switch (Number(rideData.rideStatus)) {
    case 0:
      pickup = driverLocation;
      drop = pickupPoint;
      message = "Driver is heading to pickup location";
      break;

    case 1:
      pickup = driverLocation;
      drop = dropPoint;
      message = "Trip is in progress";
      break;

    case -1:
      return <ErrorDisplay error="This ride has been canceled. Live tracking is no longer available." />;

    case 2:
      return <ErrorDisplay error="Your journey is complete. Thank you for riding with us!" />;

    default:
      return <ErrorDisplay error="This ride cannot be tracked because the status is invalid." />;
  }

  return (
    <TrackingMap
      pickup={pickup}
      drop={drop}
      driverLocation={driverLocation}
      rideStatus={rideData.rideStatus}
      customerName={rideData.customerName}
      pickupPlace={rideData.requestedPickupPlace}
      dropPlace={rideData.requestedDropPlace}
      message={message}
      rideId={trackID}
    />
  );
};

export default MapPage;
