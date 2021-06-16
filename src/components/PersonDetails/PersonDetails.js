import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PersonDetails.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import moviesOperations from "../../redux/movies/movies-operations";
import { useRouteMatch } from "react-router";
import MovieList from "../MovieList";
import Fallback from "../Fallback";

export default function PersonDetails() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();

  useEffect(() => {
    dispatch(moviesOperations.fetchPersonDetails(params.id));
    dispatch(moviesOperations.fetchPersonParticipation(params.id));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dispatch, params.id]);

  const personInfo = useSelector(moviesSelectors.getPersonDetails);
  const personParticipation = useSelector(
    moviesSelectors.getPersonParticipation
  );
  const { name, profile_path, birthday, place_of_birth, biography } =
    personInfo;
  const isLoading = useSelector(moviesSelectors.getLoading);

  return (
    <section className="Person">
      {isLoading ? (
        <Fallback />
      ) : (
        <div className="container">
          <h1 className="Person__name">{name}</h1>
          {profile_path && (
            <img
              className="Person__img"
              src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
              width="200"
              alt={name}
            ></img>
          )}
          <p className="Person__info">Information</p>
          <ul className="Person__list">
            <li className="Person__list-item">
              <p className="Person__decr">
                <span>Age:</span>

                {birthday &&
                  new Date().getFullYear() -
                    birthday.split("").slice(0, 4).join("")}
              </p>
            </li>
            <li className="Person__list-item">
              <p className="Person__decr">
                <span>Date of birth:</span> {birthday}
              </p>
            </li>
            <li className="Person__list-item">
              <p className="Person__decr">
                <span>Place of birth:</span> {place_of_birth}
              </p>
            </li>
          </ul>
          <p className="Person__bio">Biography:</p>
          <p className="Person__bio-descr">{biography}</p>

          <h2 className="Person__filmography">Filmography</h2>
          {personParticipation && (
            <MovieList moviesList={personParticipation} />
          )}
        </div>
      )}
    </section>
  );
}
