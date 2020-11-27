import { useEffect, useState } from "react";
import { AnimeCardProps } from "../components/AnimeList";

const sortData = (sort: string, data: any) => {
  console.log("sorting data...");

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

export const useFetch = (url: string, sort?: string, type?: string) => {
  // const [data, setData] = useState<AnimeCardProps[]>([]);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  console.log("fetching..", url);
  console.log("sort by", sort);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      let item = type ? data[type] : data;

      // Sort data
      item = sort ? sortData(sort, item) : item;

      setData(item);
      setLoading(false);
      console.log(item);
    }

    fetchData();
  }, [url, sort, type]);

  return { data, loading, setLoading, setData };
};

export default useFetch;
