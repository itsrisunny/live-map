import { Source, Layer } from "react-map-gl";

const RouteLayer = ({ geometry }) => {
  if (!geometry) return null;

  return (
    <Source
      id="route-source"
      type="geojson"
      data={{
        type: "Feature",
        geometry,
      }}
    >
      <Layer
        id="route-line"
        type="line"
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
        paint={{
          "line-color": "blue", // 🔵 Blue
          "line-width": 8,         // 🔥 Broad route
          "line-opacity": 0.9,
        }}
      />
    </Source>
  );
};

export default RouteLayer;
