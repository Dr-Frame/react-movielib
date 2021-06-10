import React, { useCallback, useEffect, useState } from "react";
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
  totalResults,
}) {
  const location = useLocation();
  console.log("movielist location: ", location);
  const isLoading = useSelector(moviesSelectors.getLoading);
  const [resultsPerPage, setResultsPerPage] = useState(20);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* const somefn = (genres) => {
    genres.map((id) => {
      return (
        <li>
          {genresDB.forEach((genre) => {
            if (genre.id === id) {
              console.log(genre.name);
              return <p>{genre.name}</p>;
            }
          })}
        </li>
      );
    });
  };

  let genreArr = [];
  film.genre_ids.forEach((genreId) => {
    for (const genre of genreDB) {
      if (genre.id === genreId) {
        genreArr.push(genre.name);
      }
    }
  }); */

  const genreMatcher = useCallback(({ genre_ids }) => {
    let genres = [];
    genre_ids?.map((id) => {
      for (const genre of genresDB) {
        if (genre.id === id) {
          genres.push(genre.name);
        }
      }
    });
    return genres;
  }, []);
  useEffect(() => {
    genreMatcher(moviesList);
  }, [genreMatcher, moviesList]);

  return (
    <div className="MovieList__wrapper">
      <div className="testdiv">
        <div className="test test1"></div>
        <div className="test test2"></div>
        <div className="test test3"></div>
        <div className="test test4"></div>
        <div className="test test5"></div>
        <div className="test test6"></div>
        <div className="test test7"></div>
        <div className="test test8"></div>
        <div className="test test9"></div>
      </div>
      {!isLoading && moviesList && (
        <ul className="MovieList">
          {moviesList?.map(
            ({
              id,
              title,
              release_date,
              poster_path,
              genre_ids,
              vote_average,
            }) => {
              return (
                <li key={id} className="MovieList__flip-card">
                  <NavLink
                    to={{
                      pathname: `movies/${id}`,
                      state: {
                        from: { ...location, page },
                      },
                    }}
                  >
                    <div className="MovieList__flip-card-inner">
                      <div className="MovieList__flip-card-front">
                        {poster_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                            alt=""
                          />
                        )}
                      </div>
                      <div className="MovieList__flip-card-back">
                        <h2>{title}</h2>
                        <p>genres:</p>
                        <ul></ul>
                        <p>{release_date}</p>
                      </div>
                    </div>
                  </NavLink>
                </li>
              );
            }
          )}
        </ul>
      )}
      {moviesList.length > 0 && page && (
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
