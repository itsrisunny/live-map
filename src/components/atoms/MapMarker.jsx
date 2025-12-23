import { Marker } from "react-map-gl";

const MapMarker = ({ lat, lng, color }) => {
  if (!lat || !lng) return null;

  return (
    <Marker longitude={lng} latitude={lat} anchor="center">
      <div
        style={{
          width: 12,
          height: 12,
          backgroundColor: color,
          borderRadius: "50%",
          border: "2px solid white",
        }}
      />
    </Marker>
  );
};

export default MapMarker;
