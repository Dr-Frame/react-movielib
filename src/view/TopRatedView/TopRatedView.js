import React, { useState, useEffect } from "react";

import moviesSelectors from "../../redux/movies/movies-selectors";
import moviesOperations from "../../redux/movies/movies-operations";
import MovieList from "../../components/MovieList";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Homeview() {
  const location = useLocation();
  const dispatch = useDispatch();
  const topMovieList = useSelector(moviesSelectors.getTopRatedMovies);
  const totalResults = useSelector(moviesSelectors.getTotalResults);
  const [page, setPage] = useState(location?.page || 1);

  //для пагинации
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  //при маунте и смене страниц рендерим популярніе фильмы
  useEffect(() => {
    dispatch(moviesOperations.fetchTopRatedMOvies(page));
  }, [dispatch, page]);

  return (
    <main>
      <section>
        <div className="container">
          <MovieList
            moviesList={topMovieList}
            page={page}
            handlePageChange={handlePageChange}
            totalResults={totalResults}
          />
        </div>
      </section>
    </main>
  );
}