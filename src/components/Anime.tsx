import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import useFetch from "../api/useFetch";

interface Props extends RouteComponentProps<{ mal_id: string; type: string }> {}

const getDateStr = (start_date: string) => {
  const temp_date = new Date(start_date);
  const month = temp_date.toLocaleString("default", { month: "short" });
  return `${month} ${temp_date.getFullYear()}`;
};

const getAnimeStatus = async (
  id: string,
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>,
  setIsWatched: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const url = `http://localhost:9000/myanime/anime/${id}`;
  const response = await fetch(url);
  const d = await response.json();
  setIsFound(d.isFound);
  setIsWatched(d.data.is_watched);
};

function addAnime(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  data: any
) {
  setLoading(true);
  async function processData() {
    const url = "http://localhost:9000/myanime/add";
    const body = {
      image_url: data.image_url,
      is_watched: false,
      mal_id: data.mal_id,
      start_date:
        data.type === "Manga"
          ? getDateStr(data.published.from)
          : getDateStr(data.aired.from),
      title: data.title,
      type: data.type,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    const d = await response.json();
    setLoading(false);
  }

  processData();
}

function updateAnime(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsWatched: React.Dispatch<React.SetStateAction<boolean>>,
  id: string,
  is_watched: boolean
) {
  setLoading(true);
  async function processData() {
    const url = `http://localhost:9000/myanime/update/${id}`;
    const body = {
      is_watched: !is_watched,
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    const d = await response.json();
    setIsWatched(!is_watched);
    setLoading(false);
  }

  processData();
}

function deleteAnime(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  id: string
) {
  setLoading(true);

  async function processData() {
    const url = `http://localhost:9000/myanime/delete/${id}`;
    const response = await fetch(url);
    const d = await response.json();
    setLoading(false);
  }

  processData();
}

export const Anime: React.FC<Props> = ({ match }) => {
  const [isFound, setIsFound] = useState<boolean>(false);
  const [isWatched, setIsWatched] = useState<boolean>(false);
  const id = match.params.mal_id;
  const type = match.params.type;
  const url = `https://api.jikan.moe/v3/${type}/${id}`;
  const { data, loading, setLoading } = useFetch(url, {});

  getAnimeStatus(id, setIsFound, setIsWatched);

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
        <p>
          <strong>STARTED:</strong>{" "}
          {data.type === "Manga"
            ? getDateStr(data.published.from)
            : getDateStr(data.aired.from)}
        </p>
      </div>
      <div className="right">
        <button
          onClick={(e) => {
            !isFound
              ? addAnime(e, setLoading, data)
              : deleteAnime(e, setLoading, id);
          }}
        >
          {!isFound ? "Add to Myanimelist" : "Remove from Myanimelist"}
        </button>
        <button
          onClick={(e) => {
            updateAnime(e, setLoading, setIsWatched, id, isWatched);
          }}
          className={!isFound ? "hidden" : ""}
        >
          {data.type === "Manga"
            ? !isWatched
              ? "Mark as Read"
              : "Unmark as Read"
            : !isWatched
            ? "Mark as Watched"
            : "Unmark as Watched"}
        </button>
        <h1>{data.title}</h1>
        <h3>SYNOPSIS</h3>
        <p>{data.synopsis}</p>
      </div>
    </div>
  );
};

export default Anime;
