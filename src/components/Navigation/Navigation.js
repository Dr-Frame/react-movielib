import React, { useEffect } from "react";
import "./Navigation.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import moviesActions from "../../redux/movies/movies-actions";
import { NavLink, useLocation, useRouteMatch } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  MenuItem,
  MenuButton,
  MenuDivider,
  MenuHeader,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import LocalActivityRoundedIcon from "@material-ui/icons/LocalActivityRounded";
import PageviewRoundedIcon from "@material-ui/icons/PageviewRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import QueuePlayNextRoundedIcon from "@material-ui/icons/QueuePlayNextRounded";
import MovieFilterRoundedIcon from "@material-ui/icons/MovieFilterRounded";
import TheatersRoundedIcon from "@material-ui/icons/TheatersRounded";
import { BiCameraMovie } from "react-icons/bi";
import { motion } from "framer-motion";

export default function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      exit={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="Navigation__mob"
    >
      <NavLink className="Navigation__logo" exact to="/">
        <BiCameraMovie className="Navigation__logo--icon" />
        MovieLib
      </NavLink>
      <Menu
        styles={{
          top: "35px",
          backgroundColor: "#60a6bf",
        }}
        menuButton={({ open }) => (
          <MenuButton className="Navigation__btn">
            {open ? <VscChromeClose /> : <GiHamburgerMenu />}
          </MenuButton>
        )}
      >
        <MenuItem className="Navigation__menu-item">
          <NavLink
            exact
            to="/"
            className="Navigation__link"
            activeClassName="Navigation__link_active"
          >
            <HomeRoundedIcon className="Navigation__icon" />
            Home
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink
            to="/top"
            className="Navigation__link"
            activeClassName="Navigation__link_active"
          >
            <LocalActivityRoundedIcon className="Navigation__icon" />
            Top
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink
            exact
            to="/movies"
            className="Navigation__link"
            activeClassName="Navigation__link_active"
          >
            <PageviewRoundedIcon className="Navigation__icon" />
            Search
          </NavLink>
        </MenuItem>
        <MenuDivider />
        <MenuHeader style={{ color: "blue" }}>My Lists</MenuHeader>
        <MenuItem>
          <NavLink
            to={{ pathname: `/favorite` }}
            className="Navigation__link"
            activeClassName="Navigation__link_active"
          >
            <FavoriteRoundedIcon className="Navigation__icon" />
            Favorite
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink
            to={{ pathname: `/watched` }}
            className="Navigation__link"
            activeClassName="Navigation__link_active"
          >
            <MovieFilterRoundedIcon className="Navigation__icon" />
            Watched
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink
            to={{ pathname: `/queue` }}
            className="Navigation__link"
            activeClassName="Navigation__link_active"
          >
            <QueuePlayNextRoundedIcon className="Navigation__icon" />
            Queue
          </NavLink>
        </MenuItem>
      </Menu>
    </motion.nav>
  );
}

{
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
  </div>;
}

{
  /* <div className="Navigation__mobile">
  <button className="Navigation__btn" type="button" onClick={handleMenuOpen}>
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

    <button className="Navigation__btn" type="button" onClick={handleMenuClose}>
      {isMenuOpen && <VscChromeClose />}
    </button>
  </div>
</div>; */
}
