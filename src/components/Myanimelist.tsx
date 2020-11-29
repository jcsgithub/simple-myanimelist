import React, { useState } from "react";
import useFetch from "../api/useFetch";
import AnimeCard, { AnimeCardProps } from "./AnimeCard";

interface Props {}

export const Watchlist: React.FC<Props> = () => {
  const [type, setType] = useState<string>("");
  const [subtype, setSubtype] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const { data, loading, setLoading } = useFetch(
    "http://localhost:9000/myanime",
    {
      isMyanimelist: true,
      type: type,
      subtype: subtype,
      sort: sort,
    }
  );

  return (
    <div>
      <div className="top-container">
        <div className="filter-container">
          <span>Filter by: </span>
          <select
            onChange={(e) => {
              setLoading(true);
              setType(e.target.value);
            }}
            disabled={loading}
            name="type"
            value={type}
            id="type"
          >
            <option value="">Select one...</option>
            <option value="anime">Anime</option>
            <option value="manga">Manga</option>
          </select>
          <select
            onChange={(e) => {
              setLoading(true);
              setSubtype(e.target.value);
            }}
            disabled={loading}
            name="subtype"
            value={subtype}
            id="subtype"
          >
            <option value="">Select one...</option>
            <option value="watched">Watched/Read</option>
            <option value="notwatched">Not yet watched/read</option>
          </select>
        </div>

        <div className="sort-container">
          <span className="label-sort">Sort by: </span>
          <select
            onChange={(e) => {
              setLoading(true);
              setSort(e.target.value);
            }}
            disabled={loading}
            name="sort"
            value={sort}
            id="sort"
          >
            <option value="">Select one...</option>
            <option value="title1">Title (asc)</option>
            <option value="title2">Title (desc)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="loader">Loading...</p>
      ) : data.length ? (
        <div className="anime-card-container">
          {data.map((anime: AnimeCardProps) => {
            return AnimeCard(anime, anime.type === "Manga" ? "manga" : "anime");
          })}
        </div>
      ) : (
        <p className="msg">Anime list is empty.</p>
      )}
    </div>
  );
};

export default Watchlist;
