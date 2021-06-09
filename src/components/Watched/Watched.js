import React, { useState } from "react";
import { useSelector } from "react-redux";
import moviesSelectors from "../../redux/movies/movies-selectors";
import { useLocation } from "react-router";
import MovieList from "../MovieList/MovieList";

export default function Favorite() {
  const location = useLocation();
  const [page, setPage] = useState(location.page || 1);
  const watched = useSelector(moviesSelectors.getWatched);

  //для пагинации функция
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <main>
      <section>
        <div className="container">
          <MovieList
            moviesList={watched}
            page={page}
            handlePageChange={handlePageChange}
            totalResults={watched.length}
          />
        </div>
      </section>
    </main>
  );
}
