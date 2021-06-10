import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moviesSelectors from "../../redux/movies/movies-selectors";
import { useLocation } from "react-router";
import MovieList from "../MovieList/MovieList";
import moviesActions from "../../redux/movies/movies-actions";

export default function Favorite() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.page || 1);

  //для закрытие меню мобильного при открытии
  useEffect(() => dispatch(moviesActions.closeMenu()), []);

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
