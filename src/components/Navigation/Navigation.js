import React from "react";
import "./Navigation.scss";
import { NavLink, useLocation, useRouteMatch } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  const match = useRouteMatch();

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/top">Top</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Search</NavLink>
        </li>
        <li>
          <div className="dropdown">
            <button className="dropbtn">My lists</button>
            <div className="dropdown-content">
              <ul>
                <li>
                  <NavLink to={{ pathname: `/favorite` }}>Favorite</NavLink>
                </li>
                <li>
                  <NavLink to={{ pathname: `/watched` }}>Watched</NavLink>
                </li>
                <li>
                  <NavLink to={{ pathname: `/queue` }}>Queue</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
