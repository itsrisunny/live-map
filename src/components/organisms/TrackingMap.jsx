import { useEffect, useRef, useState } from "react";
import Map from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { FaCar, FaMapMarkerAlt, FaFlagCheckered } from "react-icons/fa";

import IconMarker from "../atoms/IconMarker";
import RouteLayer from "../atoms/RouteLayer";

import useRoute from "../../hooks/useRoute";
import useLiveLocationSender from "../../hooks/useLiveLocationSender";
import useLiveLocationReceiver from "../../hooks/useLiveLocationReceiver";

const TrackingMap = ({ pickup, drop }) => {
  const mapRef = useRef(null);
  const fittedOnceRef = useRef(false);

  const isViewer = window.location.hash === "#viewer";

  const route = useRoute(pickup, drop);
  useLiveLocationSender(!isViewer);
  const liveLocation = useLiveLocationReceiver();

  const [distance, setDistance] = useState(6.8);
  const [eta, setEta] = useState(15);

  /* 🔹 INITIAL FIT (pickup + drop only, once) */
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

  /* 🔹 LIVE BOUNDS UPDATE (pickup + drop + driver) */
  useEffect(() => {
    if (!mapRef.current || !liveLocation) return;

    const bounds = new mapboxgl.LngLatBounds();

    bounds.extend([pickup.lng, pickup.lat]);
    bounds.extend([drop.lng, drop.lat]);
    bounds.extend([liveLocation.lng, liveLocation.lat]);

    mapRef.current.fitBounds(bounds, {
      padding: 120,
      duration: 800,
      maxZoom: 15,
    });

    // fake numbers only for UI feel (unchanged)
    setDistance((d) => Math.max(0, d - 0.03));
    setEta((e) => Math.max(1, e - 0.05));
  }, [liveLocation, pickup, drop]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "linear-gradient(135deg, #0F172A 0%, #020617 100%)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* 🔷 GLASS INFO HEADER (UNCHANGED UI) */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(14px)",
          borderRadius: 18,
          padding: "14px 20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          color: "#E5E7EB",
          zIndex: 10,
          minWidth: 320,
        }}
      >
        <div style={{ fontSize: 13, opacity: 0.8 }}>
          🚗 Driver en route
        </div>

        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginTop: 4,
          }}
        >
          {distance.toFixed(1)} km · ETA {Math.ceil(eta)} min
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 12,
            marginTop: 6,
            opacity: 0.85,
          }}
        >
          <span>Pickup → Drop</span>
          <span>Live tracking ON</span>
        </div>
      </div>

      {/* 🗺 MAP */}
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
      >
        {/* 🔵 ROUTE */}
        <RouteLayer geometry={route} />

        {/* 🟢 PICKUP */}
        <IconMarker
          lat={pickup.lat}
          lng={pickup.lng}
          icon={<FaMapMarkerAlt />}
          label="Pickup"
          color="#22C55E"
        />

        {/* 🔴 DROP */}
        <IconMarker
          lat={drop.lat}
          lng={drop.lng}
          icon={<FaFlagCheckered />}
          label="Drop"
          color="#EF4444"
        />

        {/* 🚗 LIVE DRIVER */}
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
