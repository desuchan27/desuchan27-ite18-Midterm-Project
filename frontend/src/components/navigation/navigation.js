import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";
import Home from "../home/home";

const Navigation = () => {
  const [active, setActive] = useState("nav_menu");
  const [toggleIcon, setToggleIcon] = useState("nav_toggler");

  const navToggle = () => {
    setActive((prevState) =>
      prevState === "nav_menu" ? "nav_menu nav_active" : "nav_menu"
    );

    setToggleIcon((prevState) =>
      prevState === "nav_toggler" ? "nav_toggler toggle" : "nav_toggler"
    );
  };

  return (
    <nav className="nav">
      <a href="home" className="logo">
        Doge Gallery
      </a>
      <ul className={active}>
        <li className="item">
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li className="item">
          <Link to="/logout" className="link">
            Logout
          </Link>
        </li>
      </ul>
      <div onClick={navToggle} className={toggleIcon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Navigation;
