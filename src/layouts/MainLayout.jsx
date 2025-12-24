import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(135deg, #0F172A 0%, #020617 100%)",
        fontFamily: "Inter, sans-serif",
        color: "#E5E7EB",
        overflow: "hidden",
      }}
    >
      {/* ================= HEADER ================= */}
      <header
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
      >
        {/* Left */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#22C55E",
              boxShadow: "0 0 10px #22C55E",
            }}
          />
          <span style={{ fontWeight: 600, fontSize: 15 }}>
            Live Location Tracking
          </span>
        </div>

        {/* Right */}
        <div
          style={{
            fontSize: 12,
            opacity: 0.8,
            letterSpacing: 0.5,
          }}
        >
          Secure · Real-time · Shareable
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer
        style={{
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          fontSize: 11,
          opacity: 0.85,
        }}
      >
        <span>© {new Date().getFullYear()} Live Tracking</span>
        <span>Powered by Mapbox · WebSocket</span>
      </footer>
    </div>
  );
};

export default MainLayout;
