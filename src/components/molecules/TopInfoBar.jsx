const TopInfoBar = ({ pickup, drop }) => {
  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <span style={styles.dotGreen} />
        <span style={styles.text}>
          Pickup: {pickup.lat.toFixed(4)}, {pickup.lng.toFixed(4)}
        </span>
      </div>

      <div style={styles.row}>
        <span style={styles.dotRed} />
        <span style={styles.text}>
          Drop: {drop.lat.toFixed(4)}, {drop.lng.toFixed(4)}
        </span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "absolute",
    top: 16,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    padding: "12px 16px",
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    zIndex: 10,
    minWidth: 280,
  },
  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: 6,
  },
  dotGreen: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "green",
    marginRight: 8,
  },
  dotRed: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "red",
    marginRight: 8,
  },
  text: {
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
  },
};

export default TopInfoBar;
