import actions from "./movies-actions";
import axios from "axios";
import movieActions from "./movies-actions";

const key = "3550330ecc32a34c7342dbd44dd96d6e";

const changeQuery = (query) => (dispatch) => {
  dispatch(movieActions.changeQuery(query));
};

const clearQuery = () => (dispatch) => {
  dispatch(movieActions.clearQuery());
};

const fetchSearchMovies =
  (query, page = 1) =>
  async (dispatch) => {
    const link = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=${page}&include_adult=false`;

    dispatch(movieActions.searchMovieRequest());
    dispatch(movieActions.isItSearchQuery());
    try {
      await axios.get(link).then(({ data }) => {
        console.log(data);
        dispatch(movieActions.searchMovieSuccess(data.results));
        dispatch(movieActions.fetchTotalResults(data.total_results));
        dispatch(movieActions.fetchTotalPages(data.total_pages));
      });
    } catch (error) {
      dispatch(movieActions.searchMovieError(error));
    }
  };

const fetchPopularMovies =
  (page = 1) =>
  async (dispatch) => {
    const link = `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}&page=${page}`;

    dispatch(movieActions.fetchPopularMovieRequest());

    try {
      await axios.get(link).then(({ data }) => {
        dispatch(movieActions.fetchPopularMovieSuccess(data.results));
        dispatch(movieActions.fetchTotalResults(data.total_results));
        dispatch(movieActions.fetchTotalPages(data.total_pages));
      });
    } catch (error) {
      dispatch(movieActions.fetchPopularMovieError(error));
    }
  };

const fetchMovieDetails = (movieId) => async (dispatch) => {
  const link = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`;

  dispatch(movieActions.fetchMovieDetailsRequest());
  try {
    axios
      .get(link)
      .then(({ data }) =>
        dispatch(movieActions.fetchMovieDetailsSuccess(data))
      );
  } catch (error) {
    dispatch(movieActions.fetchMovieDetailsError(error));
  }
};

export default {
  clearQuery,
  changeQuery,
  fetchSearchMovies,
  fetchPopularMovies,
  fetchMovieDetails,
};

//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
