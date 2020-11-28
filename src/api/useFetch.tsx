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

export const useFetch = (
  url: string,
  isSearch?: boolean,
  sort?: string,
  type?: string
) => {
  // const [data, setData] = useState<AnimeCardProps[]>([]);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  console.log("fetching url ...", url);
  console.log("isSearch", isSearch);
  console.log("sort", sort);
  console.log("type", type);

  useEffect(() => {
    console.log("inside useEffect ");

    async function fetchData() {
      console.log("inside useEffect fetchData");

      const response = await fetch(url);
      const data = await response.json();
      let item = type ? data[type] : data;

      console.log("items", item);

      // Sort data
      item = sort ? sortData(sort, item) : item;
      console.log("items sorted");

      setData(item);
      setLoading(false);
      // console.log(item);
    }

    fetchData();
  }, [url, isSearch, sort, type]);

  console.log("fetch done");
  return { data, loading, setLoading, setData };
};

export default useFetch;
