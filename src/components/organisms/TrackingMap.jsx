import { useEffect, useRef, useState } from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { FaFlagCheckered, FaCar } from "react-icons/fa";

import IconMarker from "../atoms/IconMarker";
import RouteLayer from "../atoms/RouteLayer";

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
  rideId
}) => {
  const mapRef = useRef(null);
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
   * 🔥 Unified Fit Bounds Logic
   * Runs when:
   * - pickup changes (status change)
   * - drop changes (status change)
   * - liveLocation changes (driver moving)
   */
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current.getMap();

    const points = liveLocation
      ? [pickup, drop, liveLocation]
      : [pickup, drop];

    const bounds = getBoundsFromPoints(points);

    if (!bounds) return;

    const fit = () => {
      map.fitBounds(bounds, {
        padding: {
          top: 250,
          bottom: 120,
          left: 120,
          right: 120,
        },
        duration: 800,
        maxZoom: 18,
      });
    };

    if (!map.isStyleLoaded()) {
      map.once("load", fit);
    } else {
      fit();
    }

  }, [pickup, drop, liveLocation, mapLoaded]);

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
         onLoad={() => setMapLoaded(true)}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          latitude: pickup.lat,
          longitude: pickup.lng,
          zoom: 13,
        }}
        className="map_canvas tes"
        mapStyle="mapbox://styles/mapbox/dark-v11"
        dragPan={false}
        dragRotate={false}
        scrollZoom={true}
        doubleClickZoom={true}
        touchZoomRotate={true}
      >
        <RouteLayer geometry={route} />

        <IconMarker
          lat={pickup.lat}
          lng={pickup.lng}
          icon={<FaCar />}
          label="Driver"
          color="#22C55E"
        />

        <IconMarker
          lat={drop.lat}
          lng={drop.lng}
          icon={<FaFlagCheckered />}
          label={dropPlace}
          color="#EF4444"
        />
      </Map>
    </div>
  );
};

export default TrackingMap;
