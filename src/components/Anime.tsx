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
    <div className="anime-container">
      <div className="left">
        <img className="thumbnail" src={data.image_url} alt={data.title} />
        <p>
          <strong>TYPE:</strong> {data.type}
        </p>
        <p>
          <strong>STATUS:</strong> {data.status}
        </p>
      </div>
      <div className="right">
        <button>Add to List</button>
        <h1>{data.title}</h1>
        <h3>SYNOPSIS</h3>
        <p>{data.synopsis}</p>
      </div>
    </div>
  );
};

export default Anime;
