import React from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import Navigation from "../Navigation";

export default function Header() {
  return (
    <header className="Header">
      <div className="container">
        <Navigation />
      </div>
    </header>
  );
}
