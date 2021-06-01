const getQuery = (state) => state.movies.query;
const getMoviesList = (state) => state.movies.moviesList;
const getMovieDetails = (state) => state.movies.movieDetails;
const getLoading = (state) => state.movies.isLoading;
const getTotalResults = (state) => state.movies.movieTotalResults;
const getTotalPages = (state) => state.movies.movieTotalPages;
const getIsItSeacrh = (state) => state.movies.isItSearchQuery;

export default {
  getQuery,
  getMoviesList,
  getMovieDetails,
  getLoading,
  getTotalResults,
  getTotalPages,
  getIsItSeacrh,
};
