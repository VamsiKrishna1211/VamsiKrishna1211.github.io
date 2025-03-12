import React from "react";
import "./Navbar.css";
// import {Link} from "react-router-dom";
import { Link } from 'react-scroll';

import logo from "../../assets/logo.svg";
import profile_img from "../../assets/MyImage.jpeg";

const NavLink = ({ to, children, scroll_delay }) => (
  <li>
    <Link
      to={to}
      smooth={true}
      duration={scroll_delay}
      className="nav-link"
    >
      {children}
    </Link>
  </li>
);

const Navbar = () => {

  const scroll_delay = 500;

  return (
    <div className="navbar">
        <Link to="/">
            <img src={profile_img} alt="logo" className="nav-logo" />
        </Link>
        <ul className="nav-menu">
          <NavLink to="hero" scroll_delay={scroll_delay}>Home</NavLink>
          <NavLink to="about" scroll_delay={scroll_delay}>About Me</NavLink>
          <li className="nav-link">Projects</li>
          <li className="nav-link">Portfolio</li>
          <li className="nav-link">Contact</li>
        </ul>
        <div className="nav-connect">Connect With Me</div>
    </div>
  );
}

export default Navbar;
