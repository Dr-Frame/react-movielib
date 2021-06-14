import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
/* import MovieSearch from "./view/MovieSearch/MovieSearch"; */
/* import Homeview from "./view/Homeview/Homeview"; */
/* import MovieDetailsPage from "./components/MovieDetailsPage"; */
/* import Favorite from "./components/Favorite";
import Watched from "./components/Watched";
import Queue from "./components/Queue";
import PersonDetails from "./components/PersonDetails";
import TopRatedView from "./view/TopRatedView"; */
/* import Page404 from "./view/Page404/Page404"; */
import ScrollArrow from "./components/ScrollArrow";
import Fallback from "./components/Fallback";
import { AnimatePresence } from "framer-motion";

const Homeview = lazy(() =>
  import("./view/Homeview/Homeview" /*webpackChunkName: "HomePage" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./components/MovieDetailsPage" /*webpackChunkName: "MovieDetailsPage" */
  )
);
const TopRatedView = lazy(() =>
  import("./view/TopRatedView" /*webpackChunkName: "TopRatedView" */)
);
const Favorite = lazy(() =>
  import("./components/Favorite" /*webpackChunkName: "Favorite" */)
);

const Watched = lazy(() =>
  import("./components/Watched" /*webpackChunkName: "Watched" */)
);
const Queue = lazy(() =>
  import("./components/Queue" /*webpackChunkName: "Queue" */)
);
const PersonDetails = lazy(() =>
  import("./components/PersonDetails" /*webpackChunkName: "PersonDetails" */)
);
const MovieSearch = lazy(() =>
  import("./view/MovieSearch/MovieSearch" /*webpackChunkName: "MovieSearch" */)
);
const Page404 = lazy(() =>
  import("./view/Page404/Page404" /*webpackChunkName: "Page404" */)
);

function App() {
  return (
    <>
      <Header />
      <AnimatePresence exitBeforeEnter>
        <main>
          <Suspense fallback={<Fallback />}>
            <Switch>
              <Route exact path="/">
                <Homeview />
              </Route>
              <Route path="/people/movies/:id">
                <MovieDetailsPage />
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
          </Suspense>
        </main>
        <ScrollArrow />
      </AnimatePresence>
    </>
  );
}

export default App;
