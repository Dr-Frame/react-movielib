import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moviesSelectors from "../../redux/movies/movies-selectors";
import moviesOperations from "../../redux/movies/movies-operations";
import { useLocation } from "react-router";
import MovieList from "../MovieList/MovieList";
import moviesActions from "../../redux/movies/movies-actions";

export default function Favorite() {
  const location = useLocation();
  const [page, setPage] = useState(location.page || 1);

  const dispatch = useDispatch();
  const favorited = useSelector(moviesSelectors.getFavorited);

  //для закрытие меню мобильного при открытии
  useEffect(() => dispatch(moviesActions.closeMenu()), []);

  //для пагинации функция
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  console.log(favorited);
  return (
    <section>
      <div className="container">
        <MovieList
          moviesList={favorited}
          page={page}
          handlePageChange={handlePageChange}
          totalResults={favorited.length}
        />
      </div>
    </section>
  );
}
