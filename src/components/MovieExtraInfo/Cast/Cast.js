import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRouteMatch } from "react-router";
import "./Cast.scss";
import moviesOperations from "../../../redux/movies/movies-operations";
import moviesSelectors from "../../../redux/movies/movies-selectors";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Fallback from "../../Fallback";

export default function Cast() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const match = useRouteMatch();
  const { params } = match;

  const castRef = useRef();

  useEffect(() => {
    dispatch(moviesOperations.fetchMovieCredits(params.id));
    castRef.current.scrollIntoView({ behavior: "smooth" });
  }, [dispatch, params.id]);

  const cast = useSelector(moviesSelectors.getMovieCast);
  const isLoading = useSelector(moviesSelectors.getLoading);
  const isExtraLoading = useSelector(moviesSelectors.getIsExtraLoading);

  return (
    <section ref={castRef}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        exit={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container"
      >
        {isExtraLoading && !isLoading ? (
          <Fallback />
        ) : (
          <div>
            <h2>Cast</h2>
            <div className="Cast">
              <ul className="Cast__list">
                {cast &&
                  cast.map(({ name, character, profile_path, id }) => (
                    //TODO: сделать страницу актера

                    <li key={id} className="Cast__item">
                      <NavLink
                        to={{
                          pathname: `/people/${id}`,
                          state,
                        }}
                      >
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
        )}
      </motion.div>
    </section>
  );
}

//https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
