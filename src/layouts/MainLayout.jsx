import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "./../assets/images/logo.svg";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #0F172A 0%, #020617 100%)",
        fontFamily: "Inter, sans-serif",
        color: "#E5E7EB",
        overflow: "hidden",
      }}
    >
      {/* ================= HEADER ================= */}
      <header
        style={{
          height: isMobile ? 60 : 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 16px" : "0 24px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
      >
        {/* LEFT: Logo + Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          
          {/* Brand Logo */}
          <img
            src={Logo}
            alt="Ye ApniGaadi Logo"
            style={{
              height: isMobile ? 48 : 54,
              width: "auto",
              objectFit: "contain",
            }}
          />

          {/* Brand Name */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontWeight: 600,
                fontSize: isMobile ? 14 : 16,
                lineHeight: 1.2,
              }}
            >
              Ye ApniGaadi
            </span>
              <span
                style={{
                  fontSize: 11,
                  opacity: 0.7,
                  letterSpacing: 0.5,
                }}
              >
                Live Location Tracking
              </span>
          </div>
        </div>

        {/* RIGHT */}
        {!isMobile && (
          <div
            style={{
              fontSize: 12,
              opacity: 0.8,
              letterSpacing: 0.5,
            }}
          >
            Secure · Real-time · Shareable
          </div>
        )}
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
          height: isMobile ? 36 : 40,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? 4 : 0,
          padding: isMobile ? "6px 12px" : "0 24px",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          fontSize: isMobile ? 10 : 11,
          opacity: 0.85,
          textAlign: "center",
        }}
      >
        <span>© {new Date().getFullYear()} Ye ApniGaadi</span>
        <span>Powered by Mapbox · WebSocket</span>
      </footer>
    </div>
  );
};

export default MainLayout;
