const LiveStatusBadge = ({ arrived }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        background: arrived ? "#4CAF50" : "#1E88E5",
        color: "#fff",
        padding: "8px 14px",
        borderRadius: 20,
        fontWeight: 700,
        fontSize: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 10,
      }}
    >
      {arrived ? "ARRIVED" : "LIVE TRACKING"}
    </div>
  );
};

export default LiveStatusBadge;
