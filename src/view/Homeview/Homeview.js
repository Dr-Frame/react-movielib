import React, { useState, useEffect } from "react";
import "./Homeview.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import moviesOperations from "../../redux/movies/movies-operations";
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
  const dispatch = useDispatch();
  const moviesList = useSelector(moviesSelectors.getMoviesList);

  const [page, setPage] = useState(1);

  //для пагинации
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  //при маунте сетим страницу 1 (пока не нужно вродь)
  /* useEffect(() => {
    setPage(1);
  }, []); */

  //при маунте и смене страниц рендерим популярніе фильмы
  useEffect(() => {
    dispatch(moviesOperations.fetchPopularMovies(page));
  }, [dispatch, page]);

  return (
    <main>
      <section>
        <div className="container">
          <MovieList
            moviesList={moviesList}
            page={page}
            handlePageChange={handlePageChange}
          />
        </div>
      </section>
    </main>
  );
}
