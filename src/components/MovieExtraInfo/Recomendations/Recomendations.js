import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Recomendations.scss";
import moviesOperations from "../../../redux/movies/movies-operations";
import moviesSelectors from "../../../redux/movies/movies-selectors";
import Pagination from "react-js-pagination";
import { useRouteMatch } from "react-router";

export default function Reviews() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();

  return (
    <section>
      <div className="container">
        <h2>Recomendations</h2>
      </div>
    </section>
  );
}
