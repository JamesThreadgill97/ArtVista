import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png"; // Import your logo image
import default_profile from "../../../assets/profile-placeholder.png";
import plus_button from "../../../assets/plus.png"
import home_button from "../../../assets/home.png"

export default function Header() {
  const [profileImage, setProfileImage] = useState(default_profile)
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState({});
  const [showLogoDropdown, setShowLogoDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate()

  const toggleLogoDropdown = () => {
    setShowLogoDropdown(!showLogoDropdown);
    setShowProfileDropdown(false); // Close the other dropdown
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowLogoDropdown(false); // Close the other dropdown
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setUsername("");
    setShowMenu(false);
    // navigate("/login")
  };

  useEffect(()=>{ 
    const fetchUserData = async () => {
      try {
        if (localStorage.getItem("user_id")) {
          const response = await fetch(`https://artvista-api.onrender.com/users/userInfo/${localStorage.getItem("user_id")}`)
          const data = await response.json()
          if (response.status == 200) {
            setUserData(data)
            setProfileImage(data.profile_url)
          }
        }
      } catch (err) {
        console.error({error:err.message})
      }
    }
    fetchUserData()
  },[localStorage.getItem("user_id")])


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  return (
    <>
      <header id="header">
        <div className="menu-and-home">
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
          <NavLink to="/"><img className="home-btn"src={home_button} alt="Home" /></NavLink>
        </div>
        <NavLink to="/" className="header-title-link">
          <h1 className="header-title">ArtVista</h1>
        </NavLink>

        {localStorage.getItem("token") && localStorage.getItem("token") != "undefined" ? (
          <div className="plus-and-profile">
            <NavLink  to="/create"><img className="add-btn" src={plus_button} alt="add a post" /></NavLink>
          <div className="header-profile" onClick={toggleProfileDropdown}>
            <img src={profileImage} alt="Profile" />
            {/* Dropdown menu */}
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <NavLink className="dropdown-item" to={`/profile/${localStorage.getItem("user_id")}`}>{`${userData.username}'s Profile`}</NavLink>
                <NavLink className="dropdown-item" onClick={handleLogout}>Logout</NavLink>
              </div>
            )}
          </div>
          </div>
        ) : (
          <div>
            <NavLink to="/login" className="login-button">Log in</NavLink>
            <NavLink to="/register" className="login-button">Create an Account</NavLink>
          </div>
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
