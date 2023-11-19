import React from "react";
import { Link } from "react-router-dom";

function NavLink({ url, name, isActiveNav }) {
  return (
    <Link to={`/${url}`}>
      <li className={isActiveNav ? "active-nav" : ""}>{name}</li>
    </Link>
  );
}

export default NavLink;
