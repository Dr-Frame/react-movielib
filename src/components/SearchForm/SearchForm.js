import React, { useCallback, useMemo, useState } from "react";
import "./SearchForm.scss";
import { useSelector, useDispatch } from "react-redux";
import moviesActions from "../../redux/movies/movies-actions";
import moviesOperations from "../../redux/movies/movies-operations";
import moviesSelectors from "../../redux/movies/movies-selectors";

export default function SearchForm() {
  const dispatch = useDispatch();

  const query = useSelector(moviesSelectors.getQuery);

  const changeQuery = (e) => {
    dispatch(moviesOperations.changeQuery(e.currentTarget.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(moviesOperations.fetchSearchMovies(query));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input value={query} onChange={changeQuery} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}
