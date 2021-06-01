import React, { useEffect } from "react";
import "./MovieDetailsPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import moviesOperations from "../../redux/movies/movies-operations";
import moviesSelectors from "../../redux/movies/movies-selectors";

export default function MovieDetailsPage() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const { poster_path, title, vote_average, overview, genres } = useSelector(
    moviesSelectors.getMovieDetails
  );

  useEffect(() => {
    dispatch(moviesOperations.fetchMovieDetails(params.id));
  }, [dispatch, params.id]);

  /* console.log(movieInfo); */

  console.log(params);
  return (
    <section>
      <div className="container">
        <div className="MovieDetailsPage__movie-info">
          <div>
            {poster_path && (
              <img
                className="MovieDetailsPage__poster"
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt="movie-poster"
                width="200"
              ></img>
            )}
          </div>
          <div>
            <h1 className="MovieDetailsPage__top">{title}</h1>
            <p className="MovieDetailsPage__vote">
              User rate: <span>{vote_average}</span>
            </p>
            <h3 className="MovieDetailsPage__title">Overview</h3>
            <p className="MovieDetailsPage__descr">{overview}</p>
            <p className="MovieDetailsPage__title">Genres:</p>
            {/* <ul className="MovieDetailsPage__genres">
              {genres.map(({ id, name }) => {
                return (
                  <li key={id} className="MovieDetailsPage__genres--item">
                    {name}
                  </li>
                );
              })}
            </ul> */}
          </div>
        </div>
      </div>
    </section>
  );
}
