import { createReducer } from "@reduxjs/toolkit";

import { combineReducers } from "redux";
import movieActions from "../movies/movies-actions";

const query = createReducer("", {
  [movieActions.changeQuery]: (_, { payload }) => payload,
});

const moviesList = createReducer([], {
  [movieActions.searchMovieSuccess]: (_, { payload }) => payload,
  [movieActions.fetchPopularMovieSuccess]: (_, { payload }) => payload,
});

const isLoading = createReducer(false, {
  [movieActions.searchMovieRequest]: () => true,
  [movieActions.searchMovieSuccess]: () => false,
  [movieActions.searchMovieError]: () => false,
  [movieActions.fetchPopularMovieRequest]: () => true,
  [movieActions.fetchPopularMovieSuccess]: () => false,
  [movieActions.fetchPopularMovieError]: () => false,
});

export default combineReducers({
  query,
  moviesList,
  isLoading,
});
