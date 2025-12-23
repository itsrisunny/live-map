import { Marker } from "react-map-gl";

const IconMarker = ({ lat, lng, icon, label, color }) => {
  if (typeof lat !== "number" || typeof lng !== "number") return null;

  return (
    <Marker latitude={lat} longitude={lng} anchor="bottom">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        {/* ICON */}
        <div
          style={{
            background: "white",
            borderRadius: "50%",
            padding: 6,
            border: `2px solid ${color}`,
            color,
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          {icon}
        </div>

        {/* LABEL */}
        {label && (
          <div
            style={{
              marginTop: 4,
              padding: "2px 6px",
              background: "white",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 600,
              color: "#333",
              whiteSpace: "nowrap",
              boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            }}
          >
            {label}
          </div>
        )}
      </div>
    </Marker>
  );
};

export default IconMarker;
