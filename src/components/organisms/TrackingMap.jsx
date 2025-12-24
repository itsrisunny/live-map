import { useEffect, useRef } from "react";
import Map from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { FaCar, FaMapMarkerAlt, FaFlagCheckered } from "react-icons/fa";

import IconMarker from "../atoms/IconMarker";
import RouteLayer from "../atoms/RouteLayer";

import useRoute from "../../hooks/useRoute";
import useLiveLocationSender from "../../hooks/useLiveLocationSender";
import useLiveLocationReceiver from "../../hooks/useLiveLocationReceiver";

import { getDistanceKm } from "../../utils/distance";

const AVG_SPEED_KMPH = 30; // realistic city speed

const TrackingMap = ({ pickup, drop }) => {
  const mapRef = useRef(null);
  const fittedOnceRef = useRef(false);

  const isViewer = window.location.hash === "#viewer";

  const route = useRoute(pickup, drop);
  useLiveLocationSender(!isViewer);
  const liveLocation = useLiveLocationReceiver();

  /* -------------------------------
     DISTANCE
  -------------------------------- */
  const totalDistanceKm = route?.distance
    ? route.distance / 1000
    : getDistanceKm(
        pickup.lat,
        pickup.lng,
        drop.lat,
        drop.lng
      );

  const remainingDistanceKm = liveLocation
    ? getDistanceKm(
        liveLocation.lat,
        liveLocation.lng,
        drop.lat,
        drop.lng
      )
    : totalDistanceKm;

  /* -------------------------------
     ETA (Mapbox OR fallback)
  -------------------------------- */
  const etaFromMapboxMin = route?.duration
    ? route.duration / 60
    : null;

  const etaFromSpeedMin =
    (remainingDistanceKm / AVG_SPEED_KMPH) * 60;

  const etaMin = Math.ceil(
    etaFromMapboxMin ?? etaFromSpeedMin
  );

  /* -------------------------------
     INITIAL FIT
  -------------------------------- */
  useEffect(() => {
    if (!mapRef.current || fittedOnceRef.current) return;

    const bounds = new mapboxgl.LngLatBounds();
    bounds.extend([pickup.lng, pickup.lat]);
    bounds.extend([drop.lng, drop.lat]);

    mapRef.current.fitBounds(bounds, {
      padding: 120,
      duration: 900,
      maxZoom: 15,
    });

    fittedOnceRef.current = true;
  }, [pickup, drop]);

  /* -------------------------------
     LIVE BOUNDS UPDATE
  -------------------------------- */
  useEffect(() => {
    if (!mapRef.current || !liveLocation) return;

    const bounds = new mapboxgl.LngLatBounds();
    bounds.extend([pickup.lng, pickup.lat]);
    bounds.extend([drop.lng, drop.lat]);
    bounds.extend([liveLocation.lng, liveLocation.lat]);

    mapRef.current.fitBounds(bounds, {
      padding: {
        top: 200,    // 👈 extra space for info header
        bottom: 120,
        left: 120,
        right: 120,
      },
      duration: 800,
      maxZoom: 15,
    });
  }, [liveLocation, pickup, drop]);

  return (
    <div
      style={{
        width: "99vw",
        height: "98vh",
        background:
          "linear-gradient(135deg, #0F172A 0%, #020617 100%)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* INFO HEADER */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.14)",
          backdropFilter: "blur(14px)",
          borderRadius: 18,
          padding: "14px 22px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          color: "#E5E7EB",
          zIndex: 10,
          minWidth: 360,
        }}
      >
        {/* STATUS */}
        <div
          style={{
            fontSize: 12,
            opacity: 0.85,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>🚗 Driver en route</span>
          <span style={{ color: "#22C55E" }}>● Live</span>
        </div>

        {/* PRIMARY INFO */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginTop: 6,
            lineHeight: 1.2,
          }}
        >
          {remainingDistanceKm.toFixed(1)} km remaining
        </div>

        <div
          style={{
            fontSize: 14,
            marginTop: 2,
            opacity: 0.9,
          }}
        >
          Estimated arrival in <strong>{etaMin} min</strong>
        </div>

        {/* SECONDARY INFO */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            fontSize: 12,
            marginTop: 10,
            opacity: 0.85,
          }}
        >
          <div>
            <div style={{ opacity: 0.7 }}>Total distance</div>
            <div style={{ fontWeight: 600 }}>
              {totalDistanceKm.toFixed(1)} km
            </div>
          </div>

          <div>
            <div style={{ opacity: 0.7 }}>Avg speed</div>
            <div style={{ fontWeight: 600 }}>
              {etaMin > 0 && remainingDistanceKm > 0
                ? `${Math.round((remainingDistanceKm / (etaMin / 60)))} km/h`
                : "--"}
            </div>
          </div>

          <div>
            <div style={{ opacity: 0.7 }}>Last update</div>
            <div style={{ fontWeight: 600 }}>
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>


      {/* MAP */}
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={{
          latitude: pickup.lat,
          longitude: pickup.lng,
          zoom: 13,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        dragPan={false}
        dragRotate={false}
        scrollZoom={false}
        doubleClickZoom={false}
        touchZoomRotate={false}
        keyboard={false}
      >
        <RouteLayer geometry={route} />

        <IconMarker
          lat={pickup.lat}
          lng={pickup.lng}
          icon={<FaMapMarkerAlt />}
          label="Pickup"
          color="#22C55E"
        />

        <IconMarker
          lat={drop.lat}
          lng={drop.lng}
          icon={<FaFlagCheckered />}
          label="Drop"
          color="#EF4444"
        />

        {liveLocation && (
          <IconMarker
            lat={liveLocation.lat}
            lng={liveLocation.lng}
            icon={<FaCar />}
            label="Driver"
            color="#38BDF8"
          />
        )}
      </Map>
    </div>
  );
};

export default TrackingMap;
