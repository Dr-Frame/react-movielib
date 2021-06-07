import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Recomendations.scss";
import moviesOperations from "../../../redux/movies/movies-operations";
import moviesSelectors from "../../../redux/movies/movies-selectors";
import Pagination from "react-js-pagination";
import { useRouteMatch } from "react-router";

export default function Reviews() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();

  useEffect(
    () => dispatch(moviesOperations.fetchMovieRecomendations(params.id)),
    [dispatch, params.id]
  );
  const recomendationList = useSelector(
    moviesSelectors.getMovieRecomendationsList
  );

  return (
    <section>
      <div className="container">
        <h2>Recomendations</h2>
        <ul className="Recomendations__list">
          {recomendationList.map(({ id, poster_path, title, vote_average }) => {
            return (
              <li key={id} className="Recomendations__item">
                {poster_path && (
                  <img
                    className="Recomendations__img"
                    src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                    alt={title}
                  ></img>
                )}
                <h3 className="Recomendations__title">
                  Title: <span>{title}</span>
                </h3>
                <p>
                  Vote: <span>{vote_average}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
