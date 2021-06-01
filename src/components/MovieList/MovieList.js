import React, { useState, useEffect } from "react";
import "./MovieList.scss";
import moviesOperations from "../../redux/movies/movies-operations";
import moviesSelectors from "../../redux/movies/movies-selectors";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import Pagination from "react-js-pagination";

export default function MovieList() {
  const dispatch = useDispatch();
  const moviesList = useSelector(moviesSelectors.getMoviesList);
  const totalPages = useSelector(moviesSelectors.getTotalPages);
  const totalResults = useSelector(moviesSelectors.getTotalResults);
  const query = useSelector(moviesSelectors.getQuery);
  const isLoading = useSelector(moviesSelectors.getLoading);
  const isItSearchRequest = useSelector(moviesSelectors.getIsItSeacrh);

  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(20);

  const hanlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    if (isItSearchRequest) {
      dispatch(moviesOperations.fetchSearchMovies(query, page));
    } else dispatch(moviesOperations.fetchPopularMovies(page));
  }, [dispatch, page, isItSearchRequest, query]);

  return (
    <main>
      <section>
        <div className="container">
          <div>
            <ul>
              {moviesList.map(({ id, title, release_date, poster_path }) => {
                return (
                  <li key={id}>
                    <NavLink to={`/movie/${id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                        alt=""
                      />
                    </NavLink>
                    <h2>{title}</h2>
                    <p>genres</p>
                    <p>{release_date}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <Pagination
              activePage={page}
              itemsCountPerPage={resultsPerPage}
              totalItemsCount={Number(totalResults)}
              pageRangeDisplayed={10}
              onChange={hanlePageChange}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
