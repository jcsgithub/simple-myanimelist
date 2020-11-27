import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Anime from "./components/Anime";
import AnimeList from "./components/AnimeList";

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Simple MyAnimeList</h1>

      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={AnimeList} />
          <Route path="/anime/:mal_id" exact component={Anime} />
          <Route path="/" render={() => <div>Page not found.</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
