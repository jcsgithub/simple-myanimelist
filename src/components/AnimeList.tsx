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

const animeCard = (anime: AnimeCardProps, type: string, isSearch: boolean) => {
  let start_date = anime.start_date;
  if (isSearch) {
    // Fix date since search and normal query has different values for this
    const temp_date = new Date(start_date);
    const month = temp_date.toLocaleString("default", { month: "short" });
    start_date = `${month} ${temp_date.getFullYear()}`;
  }

  return (
    <div key={anime.mal_id} className="anime-card">
      <a href={`/${type}/${anime.mal_id}`}>
        <img className="thumbnail" src={anime.image_url} alt={anime.title} />
        <div className="anime-card-content">
          <h3 className="title">{anime.title}</h3>
          <button>Details</button>
          <h4 className="meta">
            {anime.type}
            <br />
            {start_date}
          </h4>
        </div>
      </a>
    </div>
  );
};

const generateUrl = (search: string, type: string, subtype: string) => {
  if (search) {
    if (subtype === "airing" || subtype === "upcoming")
      return `https://api.jikan.moe/v3/search/${type}?q=${search}&status=${subtype}`;
    else if (subtype === "movie")
      return `https://api.jikan.moe/v3/search/${type}?q=${search}&type=${subtype}`;
    return `https://api.jikan.moe/v3/search/${type}?q=${search}`;
  }

  if (subtype) {
    return `https://api.jikan.moe/v3/top/anime/1/${subtype}`;
  }

  return `https://api.jikan.moe/v3/top/${type}`;
};

export const AnimeList: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState<string>("anime");
  const [subtype, setSubtype] = useState<string>("");
  const [sort, setSort] = useState<string>("rank");

  console.log("rendering..");
  const isSearch = search ? true : false;
  const queryType = isSearch ? "results" : "top";

  const url = generateUrl(search, type, subtype);
  const { data, loading, setLoading, setData } = useFetch(
    url,
    isSearch,
    sort,
    queryType
  );

  return (
    <div>
      <TopBar
        search={search}
        type={type}
        subtype={subtype}
        sort={sort}
        loading={loading}
        setSearch={setSearch}
        setType={setType}
        setSubtype={setSubtype}
        setSort={setSort}
        setLoading={setLoading}
        // sortData={sortData}
      />

      {loading ? (
        <p className="loader">Loading...</p>
      ) : data.length ? (
        <div className="anime-card-container">
          {data.map((anime: AnimeCardProps) => {
            return animeCard(anime, type, isSearch);
          })}
        </div>
      ) : (
        <p className="msg">No results found.</p>
      )}
    </div>
  );
};

export default AnimeList;
