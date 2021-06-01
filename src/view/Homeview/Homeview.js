import React, { useEffect } from "react";
import "./Homeview.scss";
import moviesOperations from "../../redux/movies/movies-operations";
import MovieList from "../../components/MovieList";
import { useDispatch } from "react-redux";

export default function Homeview() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(moviesOperations.clearQuery());
  }, [dispatch]);

  return <MovieList />;
}
