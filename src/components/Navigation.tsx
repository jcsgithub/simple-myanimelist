import React from "react";
import { Link } from "react-router-dom";

interface Props {}

export const Navigation = () => {
  return (
    <div className="nav-container">
      <Link to="/">
        <h1 className="logo">Simple MyAnimeList</h1>
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/myanimelist">My List</Link>
      </nav>
    </div>
  );
};

export default Navigation;
