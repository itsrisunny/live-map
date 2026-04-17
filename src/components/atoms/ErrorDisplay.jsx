import React from "react";
import BackgroundImage from "./../../assets/images/bg.png";
const ErrorDisplay = ({ error }) => {
  const containerWrapperStyle = {
    height: "90vh",
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    overflow: "hidden",
  };

  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: 1,
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(2, 6, 23, 0.75)", // Dark overlay (opacity control here)
    zIndex: 2,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 3,
    padding: "30px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    color: "#ffffff",
    maxWidth: "320px",
  };

  const errorIconStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "rgba(231, 76, 60, 0.15)",
    color: "#ff4d4f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "26px",
    fontWeight: "700",
    margin: "0 auto 15px auto",
  };

  const errorMessageStyle = {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "16px",
    lineHeight: "1.5",
  };

  return (
    <div style={containerWrapperStyle}>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}></div>

      <div style={contentStyle}>
        <div style={errorIconStyle}>!</div>
        <div style={errorMessageStyle}>
          {error || "An unexpected error occurred"}
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
