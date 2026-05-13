import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxWorkerInline from "!!raw-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

import "mapbox-gl/dist/mapbox-gl.css";
import "./../../App.css";

import { FaFlagCheckered, FaCar } from "react-icons/fa";
import { createRoot } from "react-dom/client";

import useRoute from "../../hooks/useRoute";
import useLiveLocationReceiver from "../../hooks/useLiveLocationReceiver";

import { getDistanceKm } from "../../utils/distance";
import { getBoundsFromPoints } from "../../utils/fitBounds";
import { MAPBOX_TOKEN } from "../../utils/constants";

const AVG_SPEED_KMPH = 30;

const TrackingMap = ({
  pickup,
  drop,
  pickupPlace,
  dropPlace,
  rideId,
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const pickupMarkerRef = useRef(null);
  const dropMarkerRef = useRef(null);

  const [mapLoaded, setMapLoaded] = useState(false);

  const route = useRoute(pickup, drop);
  const liveLocation = useLiveLocationReceiver(rideId);

  const totalDistanceKm = route?.distance
    ? route.distance / 1000
    : getDistanceKm(pickup.lat, pickup.lng, drop.lat, drop.lng);

  const remainingDistanceKm = liveLocation
    ? getDistanceKm(
        liveLocation.lat,
        liveLocation.lng,
        drop.lat,
        drop.lng
      )
    : totalDistanceKm;

  const etaFromMapboxMin = route?.duration
    ? route.duration / 60
    : null;

  const etaFromSpeedMin =
    (remainingDistanceKm / AVG_SPEED_KMPH) * 60;

  const etaMin = Math.ceil(
    etaFromMapboxMin ?? etaFromSpeedMin
  );

  /**
   * INIT MAP
   */
  useEffect(() => {
    if (mapRef.current) return;

    // CSP Worker Fix
    const workerBlob = new Blob(
      [mapboxWorkerInline],
      { type: "application/javascript" }
    );

    mapboxgl.workerUrl =
      URL.createObjectURL(workerBlob);

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [pickup.lng, pickup.lat],
      zoom: 13,
    });

    mapRef.current = map;

    map.on("load", () => {
      setMapLoaded(true);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      URL.revokeObjectURL(mapboxgl.workerUrl);
    };
  }, [pickup]);

  /**
   * CREATE CUSTOM MARKER
   */
  const createMarkerElement = (
  icon,
  color,
  label
) => {
  const el = document.createElement("div");

  const root = createRoot(el);

  root.render(
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
          transform: "translate(4px, 0px)",
        }}
      >
        {/* ===== LABEL ON TOP ===== */}
        {label && (
          <div
            style={{
              marginBottom: 6,
              textAlign: "center",
            }}
          >
            <div
              style={{
                padding: "4px 10px",
                background: "rgba(0,0,0,0.75)",
                color: "#fff",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 0.4,
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.4)",
                maxWidth: 150,
              }}
            >
              {label}
            </div>

            {/* SMALL ARROW */}
            <div
              style={{
                width: 0,
                height: 0,
                margin: "0 auto",
                borderLeft:
                  "6px solid transparent",
                borderRight:
                  "6px solid transparent",
                borderTop:
                  "6px solid rgba(0,0,0,0.75)",
              }}
            />
          </div>
        )}

        {/* ===== ICON ===== */}
        <div
          style={{
            background:
              "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter:
              "blur(8px)",
            borderRadius: "50%",
            padding: 8,
            border: `2px solid ${color}`,
            color: color,
            fontSize: 18,
            lineHeight: 1,
            boxShadow: `0 0 12px ${color}55, 0 4px 15px rgba(0,0,0,0.4)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation:
              "map-marker-float 2.5s ease-in-out infinite",
          }}
        >
          {icon}
        </div>

        {/* ===== LOCATION DOT ===== */}
        <div
          style={{
            width: 8,
            height: 8,
            background: color,
            borderRadius: "50%",
            marginTop: 4,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>

      {/* FLOAT ANIMATION */}
      <style>
        {`
          @keyframes map-marker-float {
            0% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-6px);
            }

            100% {
              transform: translateY(0px);
            }
          }
        `}
      </style>
    </>
  );

  return el;
};

  /**
   * PICKUP / DRIVER MARKER
   */
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.remove();
    }

    const marker = new mapboxgl.Marker({
      element: createMarkerElement(
        <FaCar />,
        "#22C55E",
        "Driver"
      ),
      anchor: "bottom",
    })
      .setLngLat([
        liveLocation?.lng ?? pickup.lng,
        liveLocation?.lat ?? pickup.lat,
      ])
      .addTo(mapRef.current);

    pickupMarkerRef.current = marker;
  }, [mapLoaded, pickup, liveLocation]);

  /**
   * DROP MARKER
   */
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    if (dropMarkerRef.current) {
      dropMarkerRef.current.remove();
    }

    const marker = new mapboxgl.Marker({
      element: createMarkerElement(
        <FaFlagCheckered />,
        "#EF4444",
        dropPlace
      ),
      anchor: "bottom",
    })
      .setLngLat([drop.lng, drop.lat])
      .addTo(mapRef.current);

    dropMarkerRef.current = marker;
  }, [mapLoaded, drop, dropPlace]);

  /**
   * ROUTE LAYER
   */
  useEffect(() => {
    if (
      !mapLoaded ||
      !mapRef.current ||
      !route
    ) {
      return;
    }

    const map = mapRef.current;

    const routeGeoJSON = {
      type: "Feature",
      properties: {},
      geometry: route,
    };

    /**
     * UPDATE EXISTING SOURCE
     */
    if (map.getSource("route-source")) {
      map.getSource("route-source").setData(routeGeoJSON);
      return;
    }

    /**
     * ADD SOURCE
     */
    map.addSource("route-source", {
      type: "geojson",
      data: routeGeoJSON,
    });

    /**
     * WHITE SOLID BASE
     */
    map.addLayer({
      id: "route-line-white",
      type: "line",
      source: "route-source",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#FFFFFF",
        "line-width": 8,
        "line-opacity": 0.9,
      },
    });

    /**
     * BLACK DASHED OVERLAY
     */
    map.addLayer({
      id: "route-line-black-dashed",
      type: "line",
      source: "route-source",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#000000",
        "line-width": 4,
        "line-dasharray": [3, 3],
        "line-opacity": 0.9,
      },
    });

  }, [mapLoaded, route]);

  /**
   * FIT BOUNDS
   */
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const map = mapRef.current;

    const points = liveLocation
      ? [pickup, drop, liveLocation]
      : [pickup, drop];

    const bounds = getBoundsFromPoints(points);

    if (!bounds) return;

    map.fitBounds(bounds, {
      padding: {
        top: 250,
        bottom: 120,
        left: 120,
        right: 120,
      },
      duration: 800,
      maxZoom: 13,
    });
  }, [
    pickup,
    drop,
    liveLocation,
    mapLoaded,
  ]);

  return (
    <div className="map_container">
      {/* INFO HEADER */}
      <div className="map_info">
        <div className="map_status">
          <span>🚗 Driver en route</span>
          <span className="map_live">● Live</span>
        </div>

        <div className="map_primary">
          {remainingDistanceKm.toFixed(1)} km
          remaining
        </div>

        <div className="map_eta">
          Estimated arrival in{" "}
          <strong>{etaMin} min</strong>
        </div>

        <div className="map_secondary">
          <div>
            <div className="map_label">
              Total distance
            </div>

            <div className="map_value">
              {totalDistanceKm.toFixed(1)} km
            </div>
          </div>

          <div>
            <div className="map_label">
              Avg speed
            </div>

            <div className="map_value">
              {etaMin > 0 &&
              remainingDistanceKm > 0
                ? `${Math.round(
                    remainingDistanceKm /
                      (etaMin / 60)
                  )} km/h`
                : "--"}
            </div>
          </div>

          <div>
            <div className="map_label">
              Last update
            </div>

            <div className="map_value">
              {new Date().toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MAP */}
      <div
        ref={mapContainerRef}
        className="map_canvas tes"
        style={{
          width: "100%",
          height: "100vh",
        }}
      />
    </div>
  );
};

export default TrackingMap;