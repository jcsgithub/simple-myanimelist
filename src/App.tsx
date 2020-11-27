import React, { useState } from "react";
import useFetch from "./api/useFetch";
import AnimeList from "./components/AnimeList";
import TopBar from "./components/TopBar";

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

  return (
    <div className="container">
      <h1>Simple MyAnimeList</h1>

      <TopBar
        type={type}
        subtype={subtype}
        loading={loading}
        setType={setType}
        setSubtype={setSubtype}
        setLoading={setLoading}
      />

      <AnimeList data={data} loading={loading} />
    </div>
  );
};

export default App;
