import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css"; 

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        © {new Date().getFullYear()} LMS Lite. All rights reserved.
      </p>
      <nav className="footer-nav">
        <Link to="/" className="footer-link">Home</Link>
        <Link to="/courses" className="footer-link">Courses</Link>
        <Link to="/add" className="footer-link">Add Course</Link>
      </nav>
    </footer>
  );
}

export default Footer;


