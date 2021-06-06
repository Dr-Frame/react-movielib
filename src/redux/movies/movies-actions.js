import { createAction } from "@reduxjs/toolkit";

//поиск фильмов
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

const fetchMovieCreditsRequest = createAction(
  "movies/fetchMovieCreditsRequest"
);
const fetchMovieCreditsSuccess = createAction(
  "movies/fetchMovieCreditsSuccess"
);
const fetchMovieCreditsError = createAction("movies/fetchMovieCreditsError");

const fetchMovieReviewsRequest = createAction(
  "movies/fetchMovieReviewsRequest"
);
const fetchMovieReviewsSuccess = createAction(
  "movies/fetchMovieReviewsSuccess"
);
const fetchMovieReviewsError = createAction("movies/fetchMovieReviewsError");

const fetchTotalPages = createAction("movies/fetchTotalPages");
const fetchTotalResults = createAction("movies/fetchTotalResults");
const fetchReviewsTotalResults = createAction(
  "movies/fetchReviewsTotalResults"
);

//похожие фильмы
const fetchSimilarMoviesRequest = createAction(
  "movies/fetchSimilarMoviesRequest"
);
const fetchSimilarMoviesSuccess = createAction(
  "movies/fetchSimilarMoviesSuccess"
);
const fetchSimilarMoviesError = createAction("movies/fetchSimilarMoviesError");
const fetchSimalarMoviesResults = createAction(
  "movies/fetchSimalarMoviesResults"
);

//доп действия
const changeQuery = createAction("movies/changeQuery");
const clearQuery = createAction("movies/clearQuery");
const clearMovieList = createAction("movies/clearMovieList");

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
  clearMovieList,
  fetchMovieCreditsRequest,
  fetchMovieCreditsSuccess,
  fetchMovieCreditsError,
  fetchMovieReviewsRequest,
  fetchMovieReviewsSuccess,
  fetchMovieReviewsError,
  fetchReviewsTotalResults,
  fetchSimilarMoviesRequest,
  fetchSimilarMoviesSuccess,
  fetchSimilarMoviesError,
  fetchSimalarMoviesResults,
};
