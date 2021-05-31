import React, { useState } from "react";
import "./SearchForm.scss";
import { useSelector, useDispatch } from "react-redux";
import moviesActions from "../../redux/movies/movies-actions";
import moviesOperations from "../../redux/movies/movies-operations";
import moviesSelectors from "../../redux/movies/movies-selectors";

export default function SearchForm() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const changeQuery = (e) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(moviesOperations.fetchSearchMovies(query));
    setQuery("");
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
