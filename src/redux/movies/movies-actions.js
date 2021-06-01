import { createAction } from "@reduxjs/toolkit";

const searchMovieRequest = createAction("movies/searchMovieRequest");
const searchMovieSuccess = createAction("movies/searchMovieSuccess");
const searchMovieError = createAction("movies/searchMovieError");

const fetchPopularMovieRequest = createAction(
  "movies/fetchPopularMovieRequest"
);
const fetchPopularMovieSuccess = createAction(
  "movies/fetchPopularMovieSuccess"
);
const fetchPopularMovieError = createAction("movies/fetchPopularMovieError");

const fetchMovieDetailsRequest = createAction(
  "movies/fetchMovieDetailsRequest"
);
const fetchMovieDetailsSuccess = createAction(
  "movies/fetchMovieDetailsSuccess"
);
const fetchMovieDetailsError = createAction("movies/fetchMovieDetailsError");

const fetchTotalPages = createAction("movies/fetchTotalPages");
const fetchTotalResults = createAction("movies/fetchTotalResults");

const isItSearchQuery = createAction("movies/isItSearchQuery");

const changeQuery = createAction("movies/changeQuery");
const clearQuery = createAction("movies/clearQuery");

export default {
  clearQuery,
  changeQuery,
  searchMovieRequest,
  searchMovieSuccess,
  searchMovieError,
  fetchPopularMovieRequest,
  fetchPopularMovieSuccess,
  fetchPopularMovieError,
  fetchMovieDetailsRequest,
  fetchMovieDetailsSuccess,
  fetchMovieDetailsError,
  fetchTotalPages,
  fetchTotalResults,
  isItSearchQuery,
};
