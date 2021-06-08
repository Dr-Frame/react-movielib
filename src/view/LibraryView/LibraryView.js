import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./LibraryView.scss";
import MovieList from "../../components/MovieList";
import moviesSelectors from "../../redux/movies/movies-selectors";
import { useState } from "react";
import {
  NavLink,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";

export default function LibraryView() {
  const location = useLocation();
  const match = useRouteMatch();
  const { state } = location;
  console.log(location);
  console.log(match);

  const favorited = useSelector(moviesSelectors.getFavorited);
  const watched = useSelector(moviesSelectors.getWatched);
  const inQueue = useSelector(moviesSelectors.getInQueue);

  return (
    <div className="container">
      <h1>Library</h1>
      <ul>
        <li>
          <NavLink
            to={{
              pathname: `${match.url}/favorite`,
              state: state,
            }}
          >
            Favourite movies
          </NavLink>
        </li>
      </ul>
      <Switch>
        {
          <Route path={`${match.path}/favorite`}>
            <MovieList moviesList={favorited} />
          </Route>
        }
      </Switch>
    </div>
  );
}
