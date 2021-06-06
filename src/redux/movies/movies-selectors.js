const getQuery = (state) => state.movies.query;
const getMoviesList = (state) => state.movies.moviesList;
const getMovieDetails = (state) => state.movies.movieDetails;
const getLoading = (state) => state.movies.isLoading;
const getTotalResults = (state) => state.movies.movieTotalResults;
const getTotalPages = (state) => state.movies.movieTotalPages;
const getMovieCast = (state) => state.movies.movieCredits.cast;
const getMovieCrew = (state) => state.movies.movieCredits.crew;
const getMovieReviews = (state) => state.movies.movieReviews;
const getTotalReviewResults = (state) => state.movies.movieTotalReviews;
const getSimilarMovies = (state) => state.movies.similarMovies;
const getSimilarMoviesAmount = (state) =>
  state.movies.similarMoviesTotalResults;

export default {
  getQuery,
  getMoviesList,
  getMovieDetails,
  getLoading,
  getTotalResults,
  getTotalPages,
  getMovieCast,
  getMovieCrew,
  getMovieReviews,
  getTotalReviewResults,
  getSimilarMovies,
  getSimilarMoviesAmount,
};
