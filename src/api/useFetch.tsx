import { useEffect, useState } from "react";
import { AnimeCardProps } from "../components/AnimeCard";

const sortData = (sort: string, data: any) => {
  if (sort === "rank") {
    data.sort((a: AnimeCardProps, b: AnimeCardProps) =>
      a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0
    );
  } else if (sort === "title") {
    data.sort((a: AnimeCardProps, b: AnimeCardProps) =>
      a.title > b.title ? 1 : b.title > a.title ? -1 : 0
    );
  }

  return data;
};

export const useFetch = (url: string, body: any) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      let response;
      let finalUrl = url;

      if (!body.isMyanimelist) {
        response = await fetch(finalUrl);
      } else {
        if (body.type || body.subtype || body.sort) {
          finalUrl = "http://localhost:9000/myanime/query";
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          };
          response = await fetch(finalUrl, requestOptions);
        } else {
          response = await fetch(finalUrl);
        }
      }

      const data = await response.json();

      let items = [];
      if (!body.isMyanimelist) {
        items = body.type ? data[body.type] : data;
        items = body.sort ? sortData(body.sort, items) : items;
      } else {
        items = data;
      }

      setData(items);
      setLoading(false);
    }

    fetchData();
  }, [
    url,
    body.isSearch,
    body.isMyanimelist,
    body.type,
    body.subtype,
    body.sort,
  ]);

  return { data, loading, setLoading };
};

export default useFetch;
