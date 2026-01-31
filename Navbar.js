import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ username = "You", status = "online", notifications = 3 }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="chat-navbar">
      <div className="nav-left">
        <span className="logo">💬 ChatFlow</span>
        <span className={`status ${status}`}>● {status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </div>

      <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <li>
          Chats
          {notifications > 0 && <span className="badge">{notifications}</span>}
        </li>
        <li>Groups</li>
        <li className="profile">
          <img
            src="https://via.placeholder.com/32"
            alt="Profile"
            className="avatar"
          />
          {username}
        </li>
        <li className="logout">Logout</li>
      </ul>

      {/* Hamburger menu for small screens */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
