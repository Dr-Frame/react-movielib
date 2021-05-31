import React, { useState, useEffect } from "react";
import "./MovieList.scss";
import moviesOperations from "../../redux/movies/movies-operations";
import moviesSelectors from "../../redux/movies/movies-selectors";
import { useDispatch, useSelector } from "react-redux";

export default function MovieList() {
  const dispatch = useDispatch();
  const moviesList = useSelector(moviesSelectors.getMoviesList);

  useEffect(() => {
    dispatch(moviesOperations.fetchPopularMovies());
  }, [dispatch]);

  return (
    <main>
      <section>
        <div className="container">
          <ul>
            {moviesList.map(({ id, title, release_date, poster_path }) => {
              return (
                <li key={id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                    alt=""
                  />
                  <h2>{title}</h2>
                  <p>genres</p>
                  <p>{release_date}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
