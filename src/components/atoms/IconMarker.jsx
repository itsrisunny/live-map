import { Marker } from "react-map-gl";

const IconMarker = ({ lat, lng, icon, label, color = "#22C55E" }) => {
  if (typeof lat !== "number" || typeof lng !== "number") return null;

  return (
    <Marker latitude={lat} longitude={lng} anchor="bottom">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
          transform: "translateY(-5px)",
        }}
      >
        {/* ===== LABEL ON TOP ===== */}
        {label && (
          <div style={{ marginBottom: 6, textAlign: "center" }}>
            <div
              style={{
                padding: "4px 10px",
                background: "rgba(0,0,0,0.75)",
                color: "#fff",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 0.4,
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                maxWidth: 150,
              }}
            >
              {label}
            </div>

            {/* small arrow */}
            <div
              style={{
                width: 0,
                height: 0,
                margin: "0 auto",
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid rgba(0,0,0,0.75)",
              }}
            />
          </div>
        )}

        {/* ===== ICON ===== */}
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
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
            animation: "float 2.5s ease-in-out infinite",
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

        {/* FLOAT ANIMATION */}
        <style>
          {`
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-6px); }
              100% { transform: translateY(0px); }
            }
          `}
        </style>
      </div>
    </Marker>
  );
};

export default IconMarker;
