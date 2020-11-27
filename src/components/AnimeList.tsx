import React, { useState } from "react";
import useFetch from "../api/useFetch";
import TopBar from "./TopBar";

export interface AnimeCardProps {
  mal_id: number;
  title: string;
  image_url: string;
  type: string;
  start_date: string;
  rank: number;
}

const animeCard: React.FC<AnimeCardProps> = (anime: AnimeCardProps) => {
  return (
    <div key={anime.mal_id} className="anime-card">
      <a href={"/anime/" + anime.mal_id}>
        <img className="thumbnail" src={anime.image_url} alt={anime.title} />
        <div className="anime-card-content">
          <h3 className="title">{anime.title}</h3>
          <button>Details</button>
          <h4 className="meta">
            {anime.type}
            <br />
            {anime.start_date}
          </h4>
        </div>
      </a>
    </div>
  );
};

const generateUrl = (type: string, subtype: string) => {
  if (!subtype) {
    return type === "anime"
      ? "https://api.jikan.moe/v3/top/anime"
      : "https://api.jikan.moe/v3/top/manga";
  }
  return `https://api.jikan.moe/v3/top/anime/1/${subtype}`;
};

export const AnimeList: React.FC = () => {
  const [type, setType] = useState<string>("anime");
  const [subtype, setSubtype] = useState<string>("");
  const [sort, setSort] = useState<string>("rank");

  console.log("rendering..");

  const url = generateUrl(type, subtype);
  const { data, loading, setLoading, setData } = useFetch(url, sort, "top");

  return loading ? (
    <p className="loader">Loading...</p>
  ) : (
    <div>
      <TopBar
        type={type}
        subtype={subtype}
        sort={sort}
        loading={loading}
        setType={setType}
        setSubtype={setSubtype}
        setSort={setSort}
        setLoading={setLoading}
        // sortData={sortData}
      />

      <div className="anime-card-container">
        {data.map((anime: AnimeCardProps) => {
          return animeCard(anime);
        })}
      </div>
    </div>
  );
};

export default AnimeList;
