import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import movieActions from "../movies/movies-actions";

const query = createReducer("", {
  [movieActions.changeQuery]: (_, { payload }) => payload,
  [movieActions.clearQuery]: () => "",
});

//Массивы данных (фильмы, обзоры и т.д)
const moviesList = createReducer([], {
  [movieActions.searchMovieSuccess]: (_, { payload }) => payload,
  [movieActions.fetchPopularMovieSuccess]: (_, { payload }) => payload,
  [movieActions.clearMovieList]: () => [],
});
const movieDetails = createReducer([], {
  [movieActions.fetchMovieDetailsSuccess]: (_, { payload }) => payload,
});
const movieCredits = createReducer(
  {},
  {
    [movieActions.fetchMovieCreditsSuccess]: (_, { payload }) => payload,
  }
);
const movieReviews = createReducer([], {
  [movieActions.fetchMovieReviewsSuccess]: (_, { payload }) => payload,
});
const similarMovies = createReducer([], {
  [movieActions.fetchSimilarMoviesSuccess]: (_, { payload }) => payload,
});

//Количество результатов каких либо запросов

const movieTotalResults = createReducer("", {
  [movieActions.fetchTotalResults]: (_, { payload }) => payload,
});
const movieTotalPages = createReducer("", {
  [movieActions.fetchTotalPages]: (_, { payload }) => payload,
});
const movieTotalReviews = createReducer("", {
  [movieActions.fetchReviewsTotalResults]: (_, { payload }) => payload,
});
const similarMoviesTotalResults = createReducer("", {
  [movieActions.fetchSimalarMoviesResults]: (_, { payload }) => payload,
});

//процес загрузки данных
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
  [movieActions.fetchMovieCreditsRequest]: () => true,
  [movieActions.fetchMovieCreditsSuccess]: () => false,
  [movieActions.fetchMovieCreditsError]: () => false,
  [movieActions.fetchMovieReviewsRequest]: () => true,
  [movieActions.fetchMovieReviewsSuccess]: () => false,
  [movieActions.fetchMovieReviewsError]: () => false,
  [movieActions.fetchSimilarMoviesRequest]: () => true,
  [movieActions.fetchSimilarMoviesSuccess]: () => false,
  [movieActions.fetchSimilarMoviesError]: () => false,
});

export default combineReducers({
  query,
  moviesList,
  isLoading,
  movieDetails,
  movieTotalResults,
  movieTotalPages,
  movieCredits,
  movieTotalReviews,
  movieReviews,
  similarMoviesTotalResults,
  similarMovies,
});
