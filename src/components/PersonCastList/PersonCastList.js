import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import "./PersonCastList.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import { NavLink } from "react-router-dom";

export default function PersonCastList({ movieList }) {
  const location = useLocation();
  const isLoading = useSelector(moviesSelectors.getLoading);

  return (
    <div>
      {!isLoading && movieList && (
        <ul>
          {movieList.map(({ id, title, poster_path }) => {
            return (
              <li key={id}>
                <NavLink
                  to={{
                    pathname: `movies/${id}`,
                    state: {
                      from: { ...location },
                    },
                  }}
                >
                  {poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                      alt=""
                    />
                  )}

                  <h2>{title}</h2>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
