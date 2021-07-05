import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Recomendations.scss";
import moviesOperations from "../../../redux/movies/movies-operations";
import moviesSelectors from "../../../redux/movies/movies-selectors";
import { useRouteMatch } from "react-router";
import { motion } from "framer-motion";
import Fallback from "../../Fallback";
import MovieList from "../../MovieList";

export default function Reviews() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();

  useEffect(() => {
    dispatch(moviesOperations.fetchMovieRecomendations(params.id));
    recoRef.current.scrollIntoView({ behavior: "smooth" });
  }, [dispatch, params.id]);

  const recoRef = useRef();
  const recomendationList = useSelector(
    moviesSelectors.getMovieRecomendationsList
  );
  const isLoading = useSelector(moviesSelectors.getLoading);
  const isExtraLoading = useSelector(moviesSelectors.getIsExtraLoading);

  return (
    <section ref={recoRef}>
      {isExtraLoading && !isLoading ? (
        <Fallback />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          exit={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="container Recomendations__container"
        >
          <h2 className="Recomendations__title">Recomendations</h2>
          <MovieList moviesList={recomendationList} />
        </motion.div>
      )}
    </section>
  );
}
