import actions from "./movies-actions";
import axios from "axios";
import movieActions from "./movies-actions";

const key = "3550330ecc32a34c7342dbd44dd96d6e";

const changeQuery = (query) => (dispatch) => {
  dispatch(actions.changeQuery(query));
};

const fetchSearchMovies = (query) => async (dispatch) => {
  const link = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=1&include_adult=false`;

  dispatch(movieActions.searchMovieRequest);
  try {
    await axios.get(link).then(({ data }) => {
      dispatch(movieActions.searchMovieSuccess(data.results));
    });
  } catch (error) {
    dispatch(movieActions.searchMovieError(error));
  }
};

const fetchPopularMovies = () => async (dispatch) => {
  const link = `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`;

  dispatch(movieActions.fetchPopularMovieRequest);

  try {
    await axios.get(link).then(({ data }) => {
      dispatch(movieActions.fetchPopularMovieSuccess(data.results));
    });
  } catch (error) {
    dispatch(movieActions.fetchPopularMovieError(error));
  }
};

export default { changeQuery, fetchSearchMovies, fetchPopularMovies };
