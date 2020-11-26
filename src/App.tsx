import React, { useState } from "react";
import useFetch from "./api/useFetch";
import AnimeCard, { AnimeCardProps } from "./components/AnimeCard";

const generateUrl = (type: string, subtype: string) => {
  if (!subtype) {
    return type === "anime"
      ? "https://api.jikan.moe/v3/top/anime"
      : "https://api.jikan.moe/v3/top/manga";
  }
  return `https://api.jikan.moe/v3/top/anime/1/${subtype}`;
};

const App: React.FC = () => {
  const [type, setType] = useState<string>("anime");
  const [subtype, setSubtype] = useState<string>("");

  const url = generateUrl(type, subtype);
  const { data, loading, setLoading } = useFetch(url, "top");

  const animeList = data.map((anime: AnimeCardProps) => {
    return (
      <AnimeCard
        key={anime.mal_id}
        mal_id={anime.mal_id}
        title={anime.title}
        image_url={anime.image_url}
        type={anime.type}
        start_date={anime.start_date}
      />
    );
  });

  return (
    <div className="container">
      <h1>Personal Anime List</h1>

      <div className="top-container">
        <span>Filter by: </span>
        <select
          onChange={(e) => {
            setLoading(true);
            setType(e.target.value);
            setSubtype("");
          }}
          disabled={loading}
          name="type"
          defaultValue={type}
          id="type"
        >
          <option value="anime">Anime</option>
          <option value="manga">Manga</option>
        </select>

        <select
          onChange={(e) => {
            setLoading(true);
            setSubtype(e.target.value);
          }}
          disabled={loading}
          className={type === "manga" ? "hidden" : ""}
          name="subtype"
          defaultValue={subtype}
          id="subtype"
        >
          <option value="">Select one...</option>
          <option value="airing">Airing</option>
          <option value="upcoming">Upcoming</option>
          <option value="movie">Movie</option>
        </select>
      </div>

      <div className="top-container">
        <span>Sort by: </span>
        <select name="sort" defaultValue="" id="sort">
          <option value="">Select one...</option>
          <option value="airing">Popularity</option>
          <option value="upcoming">Name</option>
          <option value="movie">Aired date</option>
        </select>
      </div>

      {loading ? (
        <p className="loader">Loading...</p>
      ) : (
        <div className="anime-card-container">{animeList}</div>
      )}
    </div>
  );
};

export default App;
