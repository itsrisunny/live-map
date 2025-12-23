import { FaMapMarkerAlt, FaFlagCheckered, FaCar } from "react-icons/fa";

const InfoPanel = ({ pickup, drop, liveLocation }) => {
  return (
    <div style={styles.panel}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Live Trip</h2>
        <span style={styles.liveBadge}>LIVE</span>
      </div>

      {/* Pickup */}
      <div style={styles.card}>
        <FaMapMarkerAlt color="#2E7D32" />
        <div>
          <p style={styles.label}>Pickup</p>
          <p style={styles.value}>
            {pickup.lat.toFixed(4)}, {pickup.lng.toFixed(4)}
          </p>
        </div>
      </div>

      {/* Drop */}
      <div style={styles.card}>
        <FaFlagCheckered color="#C62828" />
        <div>
          <p style={styles.label}>Drop</p>
          <p style={styles.value}>
            {drop.lat.toFixed(4)}, {drop.lng.toFixed(4)}
          </p>
        </div>
      </div>

      {/* Live Location */}
      {liveLocation && (
        <div style={styles.cardHighlight}>
          <FaCar />
          <div>
            <p style={styles.label}>Driver</p>
            <p style={styles.value}>
              {liveLocation.lat.toFixed(5)}, {liveLocation.lng.toFixed(5)}
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={styles.stats}>
        <div>
          <p style={styles.statLabel}>Speed</p>
          <p style={styles.statValue}>62 km/h</p>
        </div>
        <div>
          <p style={styles.statLabel}>Remaining</p>
          <p style={styles.statValue}>5.4 km</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  panel: {
    width: "32%",
    height: "100vh",
    padding: 24,
    background: "rgba(255,255,255,0.65)",
    backdropFilter: "blur(14px)",
    borderRight: "1px solid rgba(255,255,255,0.4)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 800,
  },
  liveBadge: {
    background: "linear-gradient(135deg,#1E88E5,#42A5F5)",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
  },
  card: {
    display: "flex",
    gap: 14,
    background: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    alignItems: "center",
  },
  cardHighlight: {
    display: "flex",
    gap: 14,
    background: "linear-gradient(135deg,#1E88E5,#64B5F6)",
    color: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 18,
    boxShadow: "0 6px 16px rgba(30,136,229,0.4)",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    opacity: 0.7,
  },
  value: {
    fontSize: 14,
    fontWeight: 700,
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    background: "#fff",
    padding: 18,
    borderRadius: 18,
    boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 800,
  },
};

export default InfoPanel;
