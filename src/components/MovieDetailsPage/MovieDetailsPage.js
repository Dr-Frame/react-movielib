import React, { useEffect } from "react";
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
import Cast from "../MovieExtraInfo/Cast";
import Reviews from "../MovieExtraInfo/Reviews";
import MovieImages from "../MovieExtraInfo/MovieImages";
import SimilarMovies from "../MovieExtraInfo/SimilarMovies";
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
  console.log("match:", match);
  console.log("location", location);
  console.log("history", history);
  /* console.log("routeMatch", routeMatch); */
  console.log("params", params);
  /*   console.log("page", state.page); */

  //данные для страницы фильма
  const { poster_path, title, vote_average, overview, genres, release_date } =
    useSelector(moviesSelectors.getMovieDetails);

  //рендерим фильм исходя из айди полученого от мувилиста через params
  useEffect(() => {
    dispatch(moviesOperations.fetchMovieDetails(params.id));
  }, [dispatch, params.id]);

  //если есть слово запрос, значит пришли со страницы поиска (пушим строку поиска что бы отобразился запрос который был), если нету то с главной
  const handleGoBack = () => {
    //проверка state на null or undefined
    if (state?.query) {
      history.push({
        pathname: "/movies",
        //прокидываем на мувисерч обратно номер страницы с которой входили сюда
        page: state.page,
        search: `?query=${state.query}`,
      });
    } else {
      history.push({
        pathname: "/",
        page: state.page,
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
            <p className="MovieDetailsPage__release">
              Release date: {release_date}
            </p>
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
                <li>
                  <NavLink
                    to={{
                      pathname: `${match.url}/similar`,
                      state: state,
                    }}
                  >
                    Similar
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
        <Route path={`${match.path}/similar`} component={SimilarMovies}></Route>
      </Switch>
    </section>
  );
}
