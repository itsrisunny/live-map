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
      {/* WHITE SOLID BASE */}
      <Layer
        id="route-line-white"
        type="line"
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
        paint={{
          "line-color": "#FFFFFF",
          "line-width": 8,
          "line-opacity": 0.9,
        }}
      />

      {/* BLACK DASHED OVERLAY */}
      <Layer
        id="route-line-black-dashed"
        type="line"
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
        paint={{
          "line-color": "#000000",
          "line-width": 4,
          "line-dasharray": [3, 3], // dashed
          "line-opacity": 0.9,
        }}
      />
    </Source>
  );
};

export default RouteLayer;
