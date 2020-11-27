import React from "react";
import { RouteComponentProps } from "react-router-dom";
import useFetch from "../api/useFetch";

interface Props extends RouteComponentProps<{ mal_id: string }> {}

export const Anime: React.FC<Props> = ({ match }) => {
  const url = `https://api.jikan.moe/v3/anime/${match.params.mal_id}`;
  const { data, loading, setLoading } = useFetch(url);

  return loading ? (
    <p className="loader">Loading...</p>
  ) : (
    <div className="container">
      <p>Inside Anime ID: {match.params.mal_id}</p>
      <code>{JSON.stringify(data)}</code>
    </div>
  );
};

export default Anime;
