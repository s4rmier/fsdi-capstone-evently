import React from "react";
import "./header.css";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="container flex-row align">
        <div className="right-col flex-row align">
          <Link to="/">
            <div className="brand-container flex-row align">
              <img className="brand-img" src="/logo.svg" alt="" />
              <h2 className="brand-name">Evently</h2>
            </div>
          </Link>
          <nav>
            <ul className="flex-row">
              <NavLink url={""} name={"Home"} />
              <li>Blog</li>
              <NavLink url={"events"} name={"Events"} />
              <li>Contact</li>
            </ul>
          </nav>
        </div>
        <div className="left-col">
          <div className="nav-actions flex-row align">
            <button id="nav-get-started" className="button">
              Get Started
            </button>
            <button id="nav-sign-in" className="button ">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
