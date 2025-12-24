import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ================= BLURRED BACKGROUND IMAGE ================= */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://www.lgnewsroom.com/wp-content/uploads/2017/12/HD-Live-Map-Self-Healing-Map1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
            filter: "blur(4px)",
          transform: "scale(1.1)", // 👈 prevents blur edges
          zIndex: 0,
        }}
      />

      {/* ================= DARK OVERLAY ================= */}
      <div
        style={{
            position: "absolute",
            inset: 0,
            background:
            "linear-gradient(135deg, rgba(0,0,0,0.75), rgba(255,255,255,0.05))",
            zIndex: 1,
        }}
        />

      {/* ================= CONTENT (NO BLUR) ================= */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#E5E7EB",
          textAlign: "center",
          gap: 24,
          padding: 24,
          boxSizing: "border-box",
        }}
      >

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 36,
            fontWeight: 700,
            margin: 0,
          }}
        >
          Live Location Tracking
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            maxWidth: 460,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Share a live tracking link and allow others to follow your journey
          in real time with accurate distance and ETA updates.
        </motion.p>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            to="/map?pickupLat=12.9716&pickupLng=77.5946&dropLat=12.9121&dropLng=77.6446"
            style={{
              padding: "14px 32px",
              borderRadius: 14,
              background: "linear-gradient(135deg, #2563EB, #38BDF8)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
              boxShadow: "0 14px 34px rgba(37,99,235,0.45)",
            }}
          >
            Open Live Map
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
