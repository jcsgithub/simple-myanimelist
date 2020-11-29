import React, { useState } from "react";
import useFetch from "../api/useFetch";
import AnimeCard, { AnimeCardProps } from "./AnimeCard";
import TopBar from "./TopBar";

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

  const isSearch = search ? true : false;
  const queryType = isSearch ? "results" : "top";

  const url = generateUrl(search, type, subtype);
  const { data, loading, setLoading } = useFetch(url, {
    isSearch: isSearch,
    sort: sort,
    type: queryType,
  });

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
      />

      {loading ? (
        <p className="loader">Loading...</p>
      ) : data.length ? (
        <div className="anime-card-container">
          {data.map((anime: AnimeCardProps) => {
            return AnimeCard(anime, type, isSearch);
          })}
        </div>
      ) : (
        <p className="msg">No results found.</p>
      )}
    </div>
  );
};

export default AnimeList;
