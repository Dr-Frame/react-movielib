import React, { useState } from "react";
import { useSelector } from "react-redux";
import moviesSelectors from "../../redux/movies/movies-selectors";
import { useLocation } from "react-router";
import MovieList from "../MovieList/MovieList";

export default function Favorite() {
  const location = useLocation();
  const [page, setPage] = useState(location.page || 1);

  const queue = useSelector(moviesSelectors.getInQueue);

  //для пагинации функция
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <main>
      <section>
        <div className="container">
          <MovieList
            moviesList={queue}
            page={page}
            handlePageChange={handlePageChange}
            totalResults={queue.length}
          />
        </div>
      </section>
    </main>
  );
}
