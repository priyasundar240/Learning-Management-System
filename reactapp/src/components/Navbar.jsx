import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Learning Management System</h1>
      </div>
      <div className="navbar-right">
        <NavLink
          to="/"
          className="nav-link"
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/courses"
          className="nav-link"
        >
          Courses
        </NavLink>
        <NavLink
          to="/add"
          className="nav-link"
        >
          Add Course
        </NavLink>
      </div>
    </nav>
  );
}

