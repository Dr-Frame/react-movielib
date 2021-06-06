import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import "./Crew.scss";
import moviesOperations from "../../../redux/movies/movies-operations";
import moviesSelectors from "../../../redux/movies/movies-selectors";
import { NavLink } from "react-router-dom";

export default function Crew() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();

  useEffect(
    () => dispatch(moviesOperations.fetchMovieCredits(params.id)),
    [dispatch, params.id]
  );

  const crew = useSelector(moviesSelectors.getMovieCrew);

  return (
    <section>
      <div>
        <h2>Crew</h2>
        <ul>
          {crew &&
            crew.map(({ id, department, job, name, profile_path }) => (
              <li key={id}>
                <NavLink to={`people/${id}`}>
                  {profile_path && (
                    <img
                      className="Crew__img"
                      src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                      alt={name}
                    ></img>
                  )}
                  <h4 className="Crew__name">{name}</h4>
                  <p className="Crew__job">
                    <span>Job:</span>
                    {job}
                  </p>
                  <p className="Crew__department">
                    <span>Department:</span>
                    {department}
                  </p>
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
