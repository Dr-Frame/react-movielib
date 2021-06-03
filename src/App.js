import React from "react";
import Header from "./components/Header";
import LibraryView from "./view/LibraryView/LibraryView";
import MovieSearch from "./view/MovieSearch/MovieSearch";
import Homeview from "./view/Homeview/Homeview";
import MovieDetailsPage from "./components/MovieDetailsPage";

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
        <Route path="/library">
          <LibraryView />
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
