import React, { useState, useEffect } from "react";
import "./Homeview.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import moviesOperations from "../../redux/movies/movies-operations";
import moviesActions from "../../redux/movies/movies-actions";
import MovieList from "../../components/MovieList";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";

export default function Homeview() {
  const location = useLocation();
  console.log(location);

  const dispatch = useDispatch();
  const moviesList = useSelector(moviesSelectors.getMoviesList);
  const totalResults = useSelector(moviesSelectors.getTotalResults);
  const [page, setPage] = useState(location?.page || 1);

  //для закрытие меню мобильного при открытии
  useEffect(() => dispatch(moviesActions.closeMenu()), []);

  //для пагинации
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  //при маунте и смене страниц рендерим популярніе фильмы
  useEffect(() => {
    dispatch(moviesOperations.fetchPopularMovies(page));
  }, [dispatch, page]);

  return (
    <main className="HomeView">
      <section>
        <div className="container">
          <MovieList
            moviesList={moviesList}
            page={page}
            handlePageChange={handlePageChange}
            totalResults={totalResults}
          />
        </div>
      </section>
    </main>
  );
}
