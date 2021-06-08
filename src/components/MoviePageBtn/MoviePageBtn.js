import React from "react";
import "./MoviePageBtn.scss";

export default function MoviePageBtn({ title, onClick }) {
  return (
    <button className="MovieDetailsPage__btn-pack__btn" onClick={onClick}>
      {title}
    </button>
  );
}
