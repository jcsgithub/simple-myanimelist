import React, { useState } from "react";
import useFetch from "./api/useFetch";
import AnimeCard from "./components/AnimeCard";

interface AnimeListItemProps {
  mal_id: number;
  title: string;
  image_url: string;
  type: string;
  start_date: string;
}

const App: React.FC = () => {
  const [type, setType] = useState<string>("anime");
  const [subtype, setSubtype] = useState<string>("");

  let url = "";

  if (!subtype) {
    url =
      type === "anime"
        ? "https://api.jikan.moe/v3/top/anime"
        : "https://api.jikan.moe/v3/top/manga";
  } else {
    url = `https://api.jikan.moe/v3/top/anime/1/${subtype}`;
  }

  const { data, loading } = useFetch(url, "top");

  return (
    <div className="container">
      <h1>Simple MyAnimeList</h1>

      <div className="top-container">
        <span>Filter by: </span>
        <select
          onChange={(e) => {
            setType(e.target.value);
            setSubtype("");
            console.log("type", type);
            console.log("subtype", subtype);
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

      <div className="anime-card-container">
        {loading ? (
          <div>
            <p>LOADING...</p>
          </div>
        ) : (
          data.map((anime: AnimeListItemProps) => {
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
          })
        )}
      </div>
    </div>
  );
};

export default App;
