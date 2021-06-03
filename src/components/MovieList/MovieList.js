import React, { useState } from "react";
import "./MovieList.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";

export default function MovieList({
  moviesList,
  page,
  handlePageChange,
  query,
}) {
  const genreDB = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  const isLoading = useSelector(moviesSelectors.getLoading);
  const totalResults = useSelector(moviesSelectors.getTotalResults);
  const [resultsPerPage, setResultsPerPage] = useState(20);

  return (
    <div>
      {!isLoading && (
        <ul>
          {moviesList.map(({ id, title, release_date, poster_path }) => {
            return (
              <li key={id}>
                <NavLink
                  to={{
                    pathname: `movies/${id}`,
                    state: {
                      query,
                      page,
                    },
                  }}
                >
                  {poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                      alt=""
                    />
                  )}

                  <h2>{title}</h2>
                  <p>genres</p>
                  <p>{release_date}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
      {moviesList.length > 0 && (
        <Pagination
          activePage={page}
          itemsCountPerPage={resultsPerPage}
          totalItemsCount={Number(totalResults)}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}
