import React from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import LibraryView from "./view/LibraryView/LibraryView";
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
        <Route path="/movie/:id">
          <MovieDetailsPage />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </>
  );
}

export default App;
