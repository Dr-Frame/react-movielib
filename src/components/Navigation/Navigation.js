import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Search</NavLink>
        </li>
        <li>
          <NavLink to="/library">Library</NavLink>
        </li>
        <li>
          <NavLink to="/favorite">Favorite List</NavLink>
        </li>
      </ul>
    </nav>
  );
}
