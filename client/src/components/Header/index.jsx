import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import profileImage from "../../../assets/profile-placeholder.png";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState("");
  const [showLogoDropdown, setShowLogoDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleLogoDropdown = () => {
    setShowLogoDropdown(!showLogoDropdown);
    setShowProfileDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowLogoDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setUsername("");
    setShowMenu(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(
            "http://localhost:3000/users/showId",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          if (response.status === 201) {
            if (data.user_id === localStorage.getItem("user_id")) {
              setUsername(data.username);
            } else {
              console.error("user_ids don't match");
            }
          }
        }
      } catch (err) {
        console.error({ error: err.message });
      }
    };

    fetchUserData();
  }, [localStorage.getItem("token")]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      <header>
        <div className="header-logo" onClick={toggleLogoDropdown}>
          <img src={logo} alt="Logo" />
          {showLogoDropdown && (
            <div className="logo-dropdown">
              <NavLink className="dropdown-item" to="/">
                Home
              </NavLink>
              <NavLink className="dropdown-item" to="/dmca">
                DMCA
              </NavLink>
              <NavLink className="dropdown-item" to="/etiquette">
                Etiquette
              </NavLink>
              <NavLink className="dropdown-item" to="/contactUs">
                Contact Us
              </NavLink>
            </div>
          )}
        </div>
        <NavLink to="/" className="header-title-link">
          <h1 className="header-title">ArtVista</h1>
        </NavLink>

        {isLoggedIn ? (
          <div className="header-profile" onClick={toggleProfileDropdown}>
            <img src={profileImage} alt="Profile" />
            {/* Dropdown menu */}
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <NavLink className="dropdown-item" to="/profile">Profile</NavLink>
                <NavLink className="dropdown-item" to="/create">Create Post</NavLink>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" className="login-button">Log in</NavLink>
        )}
      </header>

      <Outlet />
      <footer>
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
        <NavLink className="nav-link" to="/dmca">
          DMCA
        </NavLink>
        <NavLink className="nav-link" to="/etiquette">
          Etiquette
        </NavLink>
        <NavLink className="nav-link" to="/contactUs">
          Contact Us
        </NavLink>
      </footer>
    </>
  );
}
