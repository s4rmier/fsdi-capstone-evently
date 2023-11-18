import React from "react";
import { Link } from "react-router-dom";

function NavLink({ url, name }) {
  return (
    <Link to={`/${url}`}>
      <li>{name}</li>
    </Link>
  );
}

export default NavLink;
