import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PersonDetails.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import moviesOperations from "../../redux/movies/movies-operations";
import { useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import MovieList from "../MovieList";
import PersonCastList from "../PersonCastList";

export default function PersonDetails() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();

  useEffect(() => {
    dispatch(moviesOperations.fetchPersonDetails(params.id));
    dispatch(moviesOperations.fetchPersonParticipation(params.id));
  }, [dispatch, params.id]);

  const personInfo = useSelector(moviesSelectors.getPersonDetails);
  const personParticipation = useSelector(
    moviesSelectors.getPersonParticipation
  );
  const { name, profile_path, birthday, place_of_birth, biography } =
    personInfo;

  console.log("pers info", personInfo);
  console.log("partisip", personParticipation);

  return (
    <section>
      <div className="container">
        <h1>{name}</h1>
        {profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
            width="200"
            alt={name}
          ></img>
        )}
        <ul>
          <li>
            <p>
              Age:
              <span>
                {birthday &&
                  new Date().getFullYear() -
                    birthday.split("").slice(0, 4).join("")}
              </span>
            </p>
          </li>
          <li>
            <p>
              Date of birth: <span>{birthday}</span>
            </p>
          </li>
          <li>
            <p>
              Place of birth: <span>{place_of_birth}</span>
            </p>
          </li>
          <li>
            <p>
              Biography: <span>{biography}</span>
            </p>
          </li>
        </ul>

        <div>
          <h2>Films with {name}</h2>
          {<PersonCastList movieList={personParticipation} />}
        </div>
      </div>
    </section>
  );
}
