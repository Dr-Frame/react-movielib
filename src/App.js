import React from "react";
import Header from "./components/Header";
import LibraryView from "./view/LibraryView/LibraryView";
import MovieSearch from "./view/MovieSearch/MovieSearch";
import Homeview from "./view/Homeview/Homeview";
import MovieDetailsPage from "./components/MovieDetailsPage";
import Favorite from "./components/Favorite";
import Watched from "./components/Watched";
import Queue from "./components/Queue";
import PersonDetails from "./components/PersonDetails";
import TopRatedView from "./view/TopRatedView";

import { Route, Switch } from "react-router-dom";
import Page404 from "./view/Page404/Page404";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Homeview />
        </Route>
        <Route path="/people/movies/:id">
          <MovieDetailsPage />
        </Route>
        <Route path="/library">
          <LibraryView />
        </Route>
        <Route path="/top">
          <TopRatedView />
        </Route>
        <Route path="/favorite">
          <Favorite />
        </Route>
        <Route path="/watched">
          <Watched />
        </Route>
        <Route path="/queue">
          <Queue />
        </Route>
        <Route path="/people/:id">
          <PersonDetails />
        </Route>
        <Route path="/movies/:id">
          <MovieDetailsPage />
        </Route>

        <Route>
          <MovieSearch path="/movies" />
        </Route>

        <Route>
          <Page404 />
        </Route>
      </Switch>
    </>
  );
}

export default App;
