import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Anime from "./components/Anime";
import AnimeList from "./components/AnimeList";
import Navigation from "./components/Navigation";

const App: React.FC = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact component={AnimeList} />
          <Route path="/:type/:mal_id" exact component={Anime} />
          <Route
            path="/"
            render={() => <p className="msg">Page not found.</p>}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
