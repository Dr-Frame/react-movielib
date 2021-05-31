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

const changeQuery = createAction("movies/changeQuery");

export default {
  changeQuery,
  searchMovieRequest,
  searchMovieSuccess,
  searchMovieError,
  fetchPopularMovieRequest,
  fetchPopularMovieSuccess,
  fetchPopularMovieError,
};
