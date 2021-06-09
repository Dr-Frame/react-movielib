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
import movieActions from "../../redux/movies/movies-actions";

export default function MovieDetailsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const match = useRouteMatch();
  const { params } = match;
  const history = useHistory();
  console.log(location);
  console.log(history);
  //рендерим фильм исходя из айди полученого от мувилиста через params
  useEffect(() => {
    dispatch(moviesOperations.fetchMovieDetails(params.id));
  }, [dispatch, params.id]);

  //если есть слово запрос, значит пришли со страницы поиска (пушим строку поиска что бы отобразился запрос который был), если нету то с главной
  /* const handleGoBack = () => {
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
  }; */

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }

    history.push("/");
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

  //проверка на можно добавить или удалить
  const moviePresenseInArrayCheck = useCallback((movieList, currentId, set) => {
    for (const movie of movieList) {
      if (movie.id === currentId) {
        set(true);
        return;
      } else if (movie.id !== currentId) {
        set(false);
      }
    }
  }, []);

  //для фейворит
  useEffect(
    () =>
      moviePresenseInArrayCheck(
        favorited,
        currentMovie.id,
        setIsMovieIncludedInFavourites
      ),
    [favorited, currentMovie.id, moviePresenseInArrayCheck]
  );
  useEffect(
    () =>
      moviePresenseInArrayCheck(
        watched,
        currentMovie.id,
        setIsMovieIncludedInWatched
      ),
    [watched, currentMovie.id, moviePresenseInArrayCheck]
  );
  useEffect(
    () =>
      moviePresenseInArrayCheck(
        inQueue,
        currentMovie.id,
        setIsMovieIncludedInQueue
      ),
    [inQueue, currentMovie.id, moviePresenseInArrayCheck]
  );

  /*  useEffect(() => {
    for (const movie of favorited) {
      if (movie.id === currentMovie.id) {
        setIsMovieIncludedInFavourites(true);
        console.log("фильм совпал, есть в фейворит: ", movie.title);
        console.log("текущий фильм: ", currentMovie.title);
        console.log(favorited);
        console.log("внутри цикла", isMovieIncludedInFavourites);
        return;
      } else if (movie.id !== currentMovie.id) {
        setIsMovieIncludedInFavourites(false);
        console.log(
          "внутри цикла- не в списке феворит",
          isMovieIncludedInFavourites
        );
      }
    }
  }, [favorited, currentMovie]); */

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
                  dispatch(movieActions.deleteFromFavourite(currentMovie.id));
                  setIsMovieIncludedInFavourites(false);
                }}
              >
                Delete from favourites
              </button>
            </li>
          ) : (
            <li>
              <button
                className="MovieDetailsPage__btn-pack__btn"
                onClick={() =>
                  dispatch(movieActions.addToFavourite(currentMovie))
                }
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
                  dispatch(movieActions.deleteFromWatched(currentMovie.id));
                  setIsMovieIncludedInWatched(false);
                }}
              >
                Delete from watched
              </button>
            </li>
          ) : (
            <li>
              <button
                className="MovieDetailsPage__btn-pack__btn"
                onClick={() =>
                  dispatch(movieActions.addToWatched(currentMovie))
                }
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
                  dispatch(movieActions.deleteFromQueue(currentMovie.id));
                  setIsMovieIncludedInQueue(false);
                }}
              >
                Delete from queue
              </button>
            </li>
          ) : (
            <li>
              <button
                className="MovieDetailsPage__btn-pack__btn"
                onClick={() => dispatch(movieActions.addToQueue(currentMovie))}
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
                      state,
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
        <Route path={`${match.path}/cast`}>
          <Cast />
        </Route>
        <Route path={`${match.path}/reviews`}>
          <Reviews />
        </Route>
        <Route path={`${match.path}/images`}>
          <MovieImages />
        </Route>
        {/* <Route path={`${match.path}/similar`} component={SimilarMovies}></Route> */}
        <Route path={`${match.path}/crew`}>
          <Crew />
        </Route>
        <Route path={`${match.path}/recomendations`}>
          <Recomendations />
        </Route>
      </Switch>
    </section>
  );
}
