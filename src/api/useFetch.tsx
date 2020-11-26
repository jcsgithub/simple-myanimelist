import { useEffect, useState } from "react";
import { AnimeCardProps } from "../components/AnimeList";

export const useFetch = (url: string, type: string) => {
  const [data, setData] = useState<AnimeCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      const item = data[type];
      setData(item);
      setLoading(false);
      console.log(item);
    }

    fetchData();
  }, [url, type]);

  return { data, loading, setLoading };
};

export default useFetch;
