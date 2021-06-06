import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRouteMatch } from "react-router";
import "./Cast.scss";
import moviesOperations from "../../../redux/movies/movies-operations";
import moviesSelectors from "../../../redux/movies/movies-selectors";
import { NavLink } from "react-router-dom";

export default function Cast() {
  const dispatch = useDispatch();
  const location = useLocation();
  const match = useRouteMatch();
  const { params } = match;
  console.log("match", match);
  console.log(location);

  useEffect(() => {
    dispatch(moviesOperations.fetchMovieCredits(params.id));
  }, [dispatch, params.id]);

  const cast = useSelector(moviesSelectors.getMovieCast);

  return (
    <section>
      <div className="container">
        <h2>Cast</h2>
        <div className="Cast">
          <ul className="Cast__list">
            {cast &&
              cast.map(({ name, character, profile_path, id }) => (
                //TODO: сделать страницу актера

                <li key={id} className="Cast__item">
                  <NavLink to={`people/${id}`}>
                    {profile_path && (
                      <img
                        className="Cast__img"
                        src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                        alt={name}
                      ></img>
                    )}
                    <h4 className="Cast__name">{name}</h4>
                    <p className="Cast__char">
                      <span>Character:</span> {character}
                    </p>
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

//https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
