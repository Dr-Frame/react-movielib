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
      {isExtraLoading && !isLoading ? (
        <Fallback />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          exit={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <h2 className="Cast__title">Cast</h2>
          <div className="Cast">
            <ul className="Cast__list">
              {cast &&
                cast.map(({ name, character, profile_path, id }) => (
                  //TODO: сделать страницу актера

                  <li key={id} className="Cast__list-card">
                    <NavLink
                      to={{
                        pathname: `/people/${id}`,
                        state,
                      }}
                    >
                      <div className="Cast__card-wrapper">
                        <div className="Cast__card">
                          <img
                            className="Cast__img"
                            src={
                              profile_path
                                ? `https://image.tmdb.org/t/p/w300/${profile_path}`
                                : "/img/empty-profile.webp"
                            }
                            alt={name}
                          ></img>
                        </div>
                        <div className="Cast__bottom">
                          <h4 className="Cast__name">{name}</h4>
                          <p className="Cast__char">Character:</p>
                          <p className="Cast__char-name">
                            {character.split(" ").includes("(voice)")
                              ? character.split(" ").slice(0, 2).join(" ")
                              : character}
                          </p>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        </motion.div>
      )}
    </section>
  );
}
