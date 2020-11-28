import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <div className="nav-container">
      <Link to="/">
        <h1 className="logo">Simple MyAnimeList</h1>
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/watched">Watched</Link>
      </nav>
    </div>
  );
};

export default Navigation;
