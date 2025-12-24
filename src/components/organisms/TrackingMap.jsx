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

const AVG_SPEED_KMPH = 30;

const TrackingMap = ({ pickup, drop }) => {
  const mapRef = useRef(null);
  const fittedOnceRef = useRef(false);

  const isViewer = window.location.hash === "#viewer";

  const route = useRoute(pickup, drop);
  useLiveLocationSender(!isViewer);
  const liveLocation = useLiveLocationReceiver();

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

  /* INITIAL FIT */
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

  /* LIVE FIT */
  useEffect(() => {
    if (!mapRef.current || !liveLocation) return;

    const bounds = new mapboxgl.LngLatBounds();
    bounds.extend([pickup.lng, pickup.lat]);
    bounds.extend([drop.lng, drop.lat]);
    bounds.extend([liveLocation.lng, liveLocation.lat]);

    mapRef.current.fitBounds(bounds, {
      padding: {
        top: 250,
        bottom: 120,
        left: 120,
        right: 120,
      },
      duration: 800,
      maxZoom: 15,
    });
  }, [liveLocation, pickup, drop]);

  return (
    <div className="map_container">
      {/* INFO HEADER */}
      <div className="map_info">
        <div className="map_status">
          <span>🚗 Driver en route</span>
          <span className="map_live">● Live</span>
        </div>

        <div className="map_primary">
          {remainingDistanceKm.toFixed(1)} km remaining
        </div>

        <div className="map_eta">
          Estimated arrival in <strong>{etaMin} min</strong>
        </div>

        <div className="map_secondary">
          <div>
            <div className="map_label">Total distance</div>
            <div className="map_value">
              {totalDistanceKm.toFixed(1)} km
            </div>
          </div>

          <div>
            <div className="map_label">Avg speed</div>
            <div className="map_value">
              {etaMin > 0 && remainingDistanceKm > 0
                ? `${Math.round(
                    remainingDistanceKm / (etaMin / 60)
                  )} km/h`
                : "--"}
            </div>
          </div>

          <div>
            <div className="map_label">Last update</div>
            <div className="map_value">
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
        className="map_canvas"
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
