import React, { useState } from "react";
import "./MovieList.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import genresDB from "../../genres";

export default function MovieList({
  moviesList,
  page,
  handlePageChange,
  query,
}) {
  const isLoading = useSelector(moviesSelectors.getLoading);
  const totalResults = useSelector(moviesSelectors.getTotalResults);
  const [resultsPerPage, setResultsPerPage] = useState(20);

  return (
    <div>
      {!isLoading && (
        <ul>
          {moviesList.map(
            ({ id, title, release_date, poster_path, genre_ids }) => {
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
                    <p>genres:</p>
                    {/* <ul>
                      {genre_ids.map((id) => (
                        <li key={id}>
                          {genresDB.forEach((genre) => {
                            if (genre.id === id) {
                              return <p>{genre.name}</p>;
                            }
                          })}
                        </li>
                      ))}
                    </ul> */}
                    <p>{release_date}</p>
                  </NavLink>
                </li>
              );
            }
          )}
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
