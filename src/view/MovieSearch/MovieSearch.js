import React, { useEffect, useState } from "react";
import "./MovieSearch.scss";
import { useSelector, useDispatch } from "react-redux";
import moviesOperations from "../../redux/movies/movies-operations";
import moviesSelectors from "../../redux/movies/movies-selectors";
import MovieList from "../../components/MovieList";
import { useLocation, useHistory } from "react-router";
import queryString from "query-string";

export default function MovieSearch() {
  const dispatch = useDispatch();
  const moviesList = useSelector(moviesSelectors.getMoviesList);
  const location = useLocation();
  const { state, search } = location;
  const { push } = useHistory();

  //из адресной строки браузера выделяем сам запрос, что бы при обновлении страницы он был как запрос.
  const initialQueryState = queryString.parse(search);
  console.log("initialQueryState", initialQueryState);

  console.log("location page", location.page);
  const [query, setQuery] = useState(initialQueryState.query || "");

  //если вернулись не с 1 страницы списка фильмов, то рендерим ее , если да, то рендерим 1
  const [page, setPage] = useState(location.page || 1);
  console.log(location);

  //при маунте убираем список популярных фильмов, что бы лист был пустой
  useEffect(() => {
    dispatch(moviesOperations.clearMovieList());
  }, []);

  //если слова запроса нету - не рендерим, если есть запрос и рендер списка
  useEffect(() => {
    if (query === "") {
      return;
    }
    dispatch(moviesOperations.fetchSearchMovies(query, page));
  }, [dispatch, page]);

  //смотрим что бы в адресной строке был запрос
  useEffect(() => {
    push({
      ...location,
      page,
      search: `?query=${query}`,
    });
  }, [query, location.search, page]);

  //запрос
  const changeQuery = (e) => {
    setQuery(e.currentTarget.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      return;
    }
    dispatch(moviesOperations.fetchSearchMovies(query));
  };

  //для пагинации функция
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>
          <input value={query} onChange={changeQuery} />
        </label>
        <button type="submit">Search</button>
      </form>
      <MovieList
        moviesList={moviesList}
        query={query}
        page={page}
        handlePageChange={handlePageChange}
      />
    </section>
  );
}
