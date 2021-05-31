import React from "react";
import "./Gallery.scss";
import MovieList from "../MovieList";

export default function Gallery() {
  return (
    <main>
      <section>
        <div className="container">
          <MovieList />
        </div>
      </section>
    </main>
  );
}
