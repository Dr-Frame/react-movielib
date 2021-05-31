import React from "react";
import "./Header.scss";
import Navigation from "../Navigation";
import SearchForm from "../SearchForm";

export default function Header() {
  return (
    <header>
      <div className="container">
        <Navigation />
        <SearchForm />
      </div>
    </header>
  );
}
