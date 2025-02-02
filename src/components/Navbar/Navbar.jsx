import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";

import logo from "../../assets/logo.svg";
import profile_img from "../../assets/anime_profile_img.jpeg";

const Navbar = () => {
  return (
    <div className="navbar">
        {/* <Link to="/"> */}
            <img src={profile_img} alt="logo" className="nav-logo" />
        {/* </Link> */}
        <ul className="nav-menu">
            <li>Home</li>
            <li>About Me</li>
            <li>Projects</li>
            <li>Portfolio</li>
            <li>Contact</li>
        </ul>

        <div className="nav-connect">Connect With Me</div>
    </div>
  );
}

export default Navbar;
