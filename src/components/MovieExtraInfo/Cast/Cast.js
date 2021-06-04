import React from "react";
import { useLocation, useRouteMatch } from "react-router";
import "./Cast.scss";

export default function Cast() {
  const location = useLocation();
  const match = useRouteMatch();
  console.log(match);
  console.log(location);
  return (
    <section>
      <div className="container">
        <h2>asgfdgfdgt</h2>
      </div>
    </section>
  );
}

//https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
