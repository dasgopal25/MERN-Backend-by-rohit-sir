import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={navStyle}>
      <h2 style={{ color: "white" }}>MyApp</h2>

      <div style={linkBox}>
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/register">Register</Link>
        <Link style={linkStyle} to="/login">Login</Link>
        <Link style={linkStyle} to="/profile">Profile</Link>
        <Link style={linkStyle} to="/update">Update</Link>
        <Link style={linkStyle} to="/logout">Logout</Link>
      </div>
    </div>
  );
};

const navStyle = {
  backgroundColor: "black",
  padding: "15px 30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const linkBox = {
  display: "flex",
  gap: "15px",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "18px",
};

export default Navbar;
