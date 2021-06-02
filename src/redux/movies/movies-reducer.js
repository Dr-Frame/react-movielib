import { createReducer } from "@reduxjs/toolkit";

import { combineReducers } from "redux";
import movieActions from "../movies/movies-actions";

const query = createReducer("", {
  [movieActions.changeQuery]: (_, { payload }) => payload,
  [movieActions.clearQuery]: () => "",
});

const moviesList = createReducer([], {
  [movieActions.searchMovieSuccess]: (_, { payload }) => payload,
  [movieActions.fetchPopularMovieSuccess]: (_, { payload }) => payload,
  [movieActions.clearMovieList]: () => [],
});

const movieDetails = createReducer([], {
  [movieActions.fetchMovieDetailsSuccess]: (_, { payload }) => payload,
});

const movieTotalResults = createReducer("", {
  [movieActions.fetchTotalResults]: (_, { payload }) => payload,
});

const movieTotalPages = createReducer("", {
  [movieActions.fetchTotalPages]: (_, { payload }) => payload,
});

const isItSearchQuery = createReducer(false, {
  [movieActions.isItSearchQuery]: () => true,
  [movieActions.fetchPopularMovieRequest]: () => false,
});

const isLoading = createReducer(false, {
  [movieActions.searchMovieRequest]: () => true,
  [movieActions.searchMovieSuccess]: () => false,
  [movieActions.searchMovieError]: () => false,
  [movieActions.fetchPopularMovieRequest]: () => true,
  [movieActions.fetchPopularMovieSuccess]: () => false,
  [movieActions.fetchPopularMovieError]: () => false,
  [movieActions.fetchMovieDetailsRequest]: () => true,
  [movieActions.fetchMovieDetailsSuccess]: () => false,
  [movieActions.fetchMovieDetailsError]: () => false,
});

export default combineReducers({
  query,
  moviesList,
  isLoading,
  movieDetails,
  movieTotalResults,
  movieTotalPages,
  isItSearchQuery,
});
