import React, { useEffect, useState } from "react";
import "./Navigation.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import moviesActions from "../../redux/movies/movies-actions";
import { NavLink, useLocation, useRouteMatch } from "react-router-dom";
import classnames from "classnames";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";

export default function Navigation() {
  const dispatch = useDispatch();
  const location = useLocation();
  const match = useRouteMatch();

  const isMenuOpen = useSelector(moviesSelectors.getIsMenuOpened);

  useEffect(() => dispatch(moviesActions.closeMenu()), []);
  const handleMenuOpen = () => {
    dispatch(moviesActions.openMenu());
  };

  const handleMenuClose = () => {
    dispatch(moviesActions.closeMenu());
  };
  /* const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => setIsMenuOpen(false), []); */

  /*  const handleMenuOpen = () => {

    setIsMenuOpen(!isMenuOpen);
  }; */

  return (
    <>
      <div className="Navigation__mobile">
        <button
          className="Navigation__btn"
          type="button"
          onClick={handleMenuOpen}
        >
          {!isMenuOpen && <GiHamburgerMenu />}
        </button>

        <div
          className={classnames("Navigation__mobile-menu", {
            "Navigation__mobile-menu--open": isMenuOpen,
          })}
        >
          <nav className="Navigation-mobile">
            <ul className="Navigation__list">
              <li className="Navigation__item">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="Navigation__item">
                <NavLink to="/top">Top</NavLink>
              </li>
              <li className="Navigation__item">
                <NavLink to="/movies">Search</NavLink>
              </li>
              <ul>
                <li className="Navigation__item">
                  <NavLink to={{ pathname: `/favorite` }}>Favorite</NavLink>
                </li>
                <li className="Navigation__item">
                  <NavLink to={{ pathname: `/watched` }}>Watched</NavLink>
                </li>
                <li className="Navigation__item">
                  <NavLink to={{ pathname: `/queue` }}>Queue</NavLink>
                </li>
              </ul>
            </ul>
          </nav>

          <button
            className="Navigation__btn"
            type="button"
            onClick={handleMenuClose}
          >
            {isMenuOpen && <VscChromeClose />}
          </button>
        </div>
      </div>
      <div className="Navigation__desktop">
        <ul className="Navigation__list">
          <li className="Navigation__item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="Navigation__item">
            <NavLink to="/top">Top</NavLink>
          </li>
          <li className="Navigation__item">
            <NavLink to="/movies">Search</NavLink>
          </li>
          <li>
            <div className="dropdown">
              <button className="dropbtn">My lists</button>
              <div className="dropdown-content">
                <ul>
                  <li className="Navigation__item">
                    <NavLink to={{ pathname: `/favorite` }}>Favorite</NavLink>
                  </li>
                  <li className="Navigation__item">
                    <NavLink to={{ pathname: `/watched` }}>Watched</NavLink>
                  </li>
                  <li className="Navigation__item">
                    <NavLink to={{ pathname: `/queue` }}>Queue</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

{
  /* <li>
  <div className="dropdown">
    <button className="dropbtn">My lists</button>
    <div className="dropdown-content">
      <ul>
        <li className="Navigation__item">
          <NavLink to={{ pathname: `/favorite` }}>Favorite</NavLink>
        </li>
        <li className="Navigation__item">
          <NavLink to={{ pathname: `/watched` }}>Watched</NavLink>
        </li>
        <li className="Navigation__item">
          <NavLink to={{ pathname: `/queue` }}>Queue</NavLink>
        </li>
      </ul>
    </div>
  </div>
</li>; */
}
