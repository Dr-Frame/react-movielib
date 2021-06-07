import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./LibraryView.scss";
import MovieList from "../../components/MovieList";
import moviesSelectors from "../../redux/movies/movies-selectors";
import { useState } from "react";

export default function LibraryView() {
  const [page, setPage] = useState(1);
  //для пагинации
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const favorited = useSelector(moviesSelectors.getFavorited);
  const unique = Array.from(new Set(favorited.map(JSON.stringify))).map(
    JSON.parse
  );
  console.log(favorited);
  return (
    <div className="container">
      <h1>Library</h1>
      {favorited && (
        <MovieList
          moviesList={unique}
          page={page}
          handlePageChange={handlePageChange}
          totalResults={unique.length}
        />
      )}
    </div>
  );
}
