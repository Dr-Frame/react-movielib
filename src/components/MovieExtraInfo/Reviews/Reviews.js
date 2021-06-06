import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Reviews.scss";
import moviesOperations from "../../../redux/movies/movies-operations";
import moviesSelectors from "../../../redux/movies/movies-selectors";
import Pagination from "react-js-pagination";
import { useRouteMatch } from "react-router";

export default function Reviews() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const [reviewPage, setReviewPage] = useState(1);

  useEffect(
    () => dispatch(moviesOperations.fetchMovieReviews(params.id, reviewPage)),
    [dispatch, params.id, reviewPage]
  );

  const reviews = useSelector(moviesSelectors.getMovieReviews);
  const totalResults = useSelector(moviesSelectors.getTotalReviewResults);
  const resultReviewsPerPage = 20;

  const handlePageChange = (pageNumber) => {
    setReviewPage(pageNumber);
  };

  return (
    <section>
      <div className="container">
        <h2>Reviews</h2>
        <ul className="Reviews__list">
          {reviews.length === 0 ? (
            <p> There is no review yet</p>
          ) : (
            reviews.map(({ id, author, content }) => (
              <li key={id} className="Reviews__item">
                <h2 className="Reviews__author">
                  Author: <span>{author}</span>
                </h2>
                <p className="Reviews__descr">{content}</p>
              </li>
            ))
          )}
        </ul>
        <Pagination
          activePage={reviewPage}
          itemsCountPerPage={resultReviewsPerPage}
          totalItemsCount={Number(totalResults)}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </div>
    </section>
  );
}
//https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1
