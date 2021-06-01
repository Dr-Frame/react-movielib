import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import moviesOperations from "../../redux/movies/movies-operations";

export default function Navigation() {
  const dispatch = useDispatch();

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            isActive={() => dispatch(moviesOperations.fetchPopularMovies())}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/library">Library</NavLink>
        </li>
      </ul>
    </nav>
  );
}
