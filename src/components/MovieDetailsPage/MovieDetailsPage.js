import React, { useCallback, useEffect, useState } from "react";
import "./MovieDetailsPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useRouteMatch,
  useHistory,
  useParams,
  NavLink,
} from "react-router-dom";
import { Route, Switch } from "react-router-dom";
//components
import Cast from "../MovieExtraInfo/Cast";
import Reviews from "../MovieExtraInfo/Reviews";
import MovieImages from "../MovieExtraInfo/MovieImages";
import SimilarMovies from "../MovieExtraInfo/SimilarMovies";
import Crew from "../MovieExtraInfo/Crew";
import Recomendations from "../MovieExtraInfo/Recomendations";
//redux
import moviesOperations from "../../redux/movies/movies-operations";
import moviesSelectors from "../../redux/movies/movies-selectors";

export default function MovieDetailsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const match = useRouteMatch();
  const { params } = match;
  const history = useHistory();

  //рендерим фильм исходя из айди полученого от мувилиста через params
  useEffect(() => {
    dispatch(moviesOperations.fetchMovieDetails(params.id));
  }, [dispatch, params.id]);

  //если есть слово запрос, значит пришли со страницы поиска (пушим строку поиска что бы отобразился запрос который был), если нету то с главной
  const handleGoBack = () => {
    //проверка state на null or undefined
    //для посика фильмов с запросом
    if (state?.query) {
      history.push({
        pathname: "/movies",
        //прокидываем на мувисерч обратно номер страницы с которой входили сюда
        page: state.page,
        search: `?query=${state.query}`,
      });
    } //если есть страница то бросаем на ту страницу популярных фильмов
    //для популярных фильмов, возврат на нужную страницу
    else if (state?.page) {
      history.push({
        pathname: "/",
        page: state.page,
      });
    }
    // если нету ни страницы ни запроса(в случае если мы дали ссылку и в истории пусто)
    else {
      history.push({
        pathname: "/",
      });
    }
  };

  //данные для страницы фильма
  const {
    poster_path,
    title,
    vote_average,
    overview,
    genres,
    release_date,
    budget,
    production_companies,
    production_countries,
    revenue,
    runtime,
  } = useSelector(moviesSelectors.getMovieDetails);

  //local storage
  const currentMovie = useSelector(moviesSelectors.getMovieDetails);
  const favorited = useSelector(moviesSelectors.getFavorited);
  const watched = useSelector(moviesSelectors.getWatched);
  const inQueue = useSelector(moviesSelectors.getInQueue);

  //стейт для любимых/просмотренных/в очереди фильмов
  const [isMovieIncludedInFavourites, setIsMovieIncludedInFavourites] =
    useState(false);
  const [isMovieIncludedInWatched, setIsMovieIncludedInWatched] =
    useState(false);
  const [isMovieIncludedInQueue, setIsMovieIncludedInQueue] = useState(false);

  console.log(isMovieIncludedInQueue);
  console.log(currentMovie.id);
  //проверка на нахождение в массиве фильма
  const check = useCallback((movieList, currentFilm, set) => {
    movieList.map((film) => {
      if (film.id === currentFilm.id) {
        set(true);
      } else {
        set(false);
      }
    });
  }, []);

  //проверка на можно добавить или удалить с любиміх
  useEffect(
    () => check(favorited, currentMovie, setIsMovieIncludedInFavourites),
    [check, favorited, currentMovie]
  );
  //проверка на добавленніе
  useEffect(
    () => check(watched, currentMovie, setIsMovieIncludedInWatched),
    [check, watched, currentMovie]
  );
  //проверка на очередь
  useEffect(
    () => check(inQueue, currentMovie, setIsMovieIncludedInQueue),
    [check, inQueue, currentMovie]
  );

  return (
    <section>
      <div className="container">
        <button type="button" onClick={handleGoBack}>
          Go back
        </button>

        <ul className="MovieDetailsPage__btn-pack">
          {isMovieIncludedInFavourites ? (
            <li>
              <button
                className="MovieDetailsPage__btn-pack__btn"
                onClick={() => {
                  dispatch(
                    moviesOperations.deleteFromFavourite(currentMovie.id)
                  );
                }}
              >
                Delete from favourites
              </button>
            </li>
          ) : (
            <li>
              <button
                className="MovieDetailsPage__btn-pack__btn"
                onClick={() => {
                  dispatch(moviesOperations.addToFavourite(currentMovie));
                }}
              >
                Add to favorites
              </button>
            </li>
          )}
          {isMovieIncludedInWatched ? (
            <li>
              <button
                className="MovieDetailsPage__btn-pack__btn"
                onClick={() => {
                  dispatch(moviesOperations.deleteFromWatched(currentMovie.id));
                }}
              >
                Delete from watched
              </button>
            </li>
          ) : (
            <li>
              <button
                className="MovieDetailsPage__btn-pack__btn"
                onClick={() => {
                  dispatch(moviesOperations.addToWatched(currentMovie));
                }}
              >
                Add to watched
              </button>
            </li>
          )}

          {isMovieIncludedInQueue ? (
            <li>
              <button
                className="MovieDetailsPage__btn-pack__btn"
                onClick={() => {
                  dispatch(moviesOperations.deleteFromQueue(currentMovie.id));
                }}
              >
                Delete from queue
              </button>
            </li>
          ) : (
            <li>
              <button
                className="MovieDetailsPage__btn-pack__btn"
                onClick={() => {
                  dispatch(moviesOperations.addToQueue(currentMovie));
                }}
              >
                Add to queue
              </button>
            </li>
          )}
        </ul>

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
            <p className="MovieDetailsPage__release">
              Release date: {release_date}
            </p>

            <p>Budget: {budget}</p>
            <p>Revenue: {revenue} $</p>
            <p>Run time: {runtime} min</p>
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

            <p>Countries: </p>
            {/* {production_countries?.length === 0 && (
              <p>{production_countries.name}</p>
            )}
            {production_countries?.length > 0 && (
              <ul>
                {production_countries.map(({ name }) => {
                  return <li key={name}>{name}</li>;
                })}
              </ul>
            )} */}

            <p>Production companies: </p>
            {/* {production_companies.length === 0 && (
              <p>{production_companies.name}</p>
            )}
            {production_companies.length > 0 && (
              <ul>
                {production_companies.map(({ name }) => {
                  return <li key={name}>{name}</li>;
                })}
              </ul>
            )} */}
            <h3 className="MovieDetailsPage__title">Overview</h3>
            <p className="MovieDetailsPage__descr">{overview}</p>

            <div className="MovieDetailsPage__extra">
              <ul>
                <li>
                  <NavLink
                    to={{
                      pathname: `${match.url}/cast`,
                      state: state,
                    }}
                  >
                    Cast
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={{
                      pathname: `${match.url}/reviews`,
                      state: state,
                    }}
                  >
                    Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={{
                      pathname: `${match.url}/images`,
                      state: state,
                    }}
                  >
                    Images
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to={{
                      pathname: `${match.url}/similar`,
                      state: state,
                    }}
                  >
                    Similar
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to={{
                      pathname: `${match.url}/crew`,
                      state: state,
                    }}
                  >
                    Crew
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={{
                      pathname: `${match.url}/recomendations`,
                      state: state,
                    }}
                  >
                    Recomendations
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Switch>
        <Route path={`${match.path}/cast`} component={Cast}></Route>
        <Route path={`${match.path}/reviews`} component={Reviews}></Route>
        <Route path={`${match.path}/images`} component={MovieImages}></Route>
        {/* <Route path={`${match.path}/similar`} component={SimilarMovies}></Route> */}
        <Route path={`${match.path}/crew`} component={Crew}></Route>
        <Route
          path={`${match.path}/recomendations`}
          component={Recomendations}
        ></Route>
      </Switch>
    </section>
  );
}
