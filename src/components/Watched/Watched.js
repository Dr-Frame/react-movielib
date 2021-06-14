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
  const watched = useSelector(moviesSelectors.getWatched);

  //для закрытие меню мобильного при открытии
  useEffect(() => dispatch(moviesActions.closeMenu()), []);

  //для пагинации функция
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
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
  );
}
