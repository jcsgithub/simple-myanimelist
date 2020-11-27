import React from "react";
import { Link } from "react-router-dom";

interface Props {}

export const Navigation = () => {
  return (
    <div className="nav-container">
      <div className="logo">
        <h1>Simple MyAnimeList</h1>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/myanimelist">My List</Link>
      </nav>
    </div>
  );
};

export default Navigation;
