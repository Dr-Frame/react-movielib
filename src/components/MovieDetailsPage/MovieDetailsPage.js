import React, { useEffect } from "react";
import "./MovieDetailsPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useRouteMatch,
  useHistory,
  useParams,
} from "react-router-dom";
import moviesOperations from "../../redux/movies/movies-operations";
import moviesSelectors from "../../redux/movies/movies-selectors";

export default function MovieDetailsPage() {
  const dispatch = useDispatch();

  const location = useLocation();
  const { state } = location;

  const { params } = useRouteMatch();

  const history = useHistory();

  /* const useparams = useParams();
  const route = useRouteMatch();
  
  console.log(location);
  console.log(history);
  console.log(useparams);
  console.log(params);
  console.log(route); */

  //данные для страницы фильма
  const { poster_path, title, vote_average, overview, genres } = useSelector(
    moviesSelectors.getMovieDetails
  );

  //рендерим фильм исходя из айди полученого от мувилиста через params
  useEffect(() => {
    dispatch(moviesOperations.fetchMovieDetails(params.id));
  }, [dispatch, params.id]);

  //если есть слово запрос, значит пришли со страницы поиска (пушим строку поиска что бы отобразился запрос который был), если нету то с главной
  const handleGoBack = () => {
    if (state.query) {
      history.push({
        pathname: "/movies",
        search: `?query=${state.query}`,
      });
    } else {
      history.push({
        pathname: "/",
      });
    }
  };

  return (
    <section>
      <div className="container">
        <button type="button" onClick={handleGoBack}>
          Go back
        </button>
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
            {genres && (
              <ul className="MovieDetailsPage__genres">
                {genres.map(({ id, name }) => {
                  return (
                    <li key={id} className="MovieDetailsPage__genres--item">
                      {name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
