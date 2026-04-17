import React from "react";
import Logo from "./../../../assets/images/logo.svg";
import RingLoader from "./../../../assets/images/ring.gif";
import "./Loader.css";

const Loader = ({ text = "Loading..." }) => {

  return (
    <div className="loader-wrapper">
      <div className="visual-container">
        <img src={RingLoader} alt="Ring Loader" className="ring-animation" />
        <img src={Logo} alt="Brand Logo" className="loader-logo" />
      </div>

      <div className="loader-text">{text}</div>
    </div>
  );
};

export default Loader;