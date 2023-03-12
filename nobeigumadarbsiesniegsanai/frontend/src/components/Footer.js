import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-text">
        © 2023 Financial Planner and Manager
      </div>
      <div className="selection-links">
        <a href="#">About</a>
        <a href="#">Support</a>
        <a href="#">Resources</a>
        <a href="/login">Shopping</a>
      </div>
    </div>
  );
};

export default Footer;
