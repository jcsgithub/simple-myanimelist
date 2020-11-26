import React from "react";

interface AppState {
  data: Array<AnimeCardProps>;
  loading: boolean;
}

export interface AnimeCardProps {
  mal_id: number;
  title: string;
  image_url: string;
  type: string;
  start_date: string;
}

const animeCard: React.FC<AnimeCardProps> = (anime: AnimeCardProps) => {
  return (
    <div key={anime.mal_id} className="anime-card">
      <a href={"/anime/" + anime.mal_id}>
        <img className="thumbnail" src={anime.image_url} alt={anime.title} />
        <div className="anime-card-content">
          <h3 className="title">{anime.title}</h3>
          <button>Details</button>
          <h4 className="meta">
            {anime.type}
            <br />
            {anime.start_date}
          </h4>
        </div>
      </a>
    </div>
  );
};

export const AnimeList: React.FC<AppState> = ({ data, loading }) => {
  return loading ? (
    <p className="loader">Loading...</p>
  ) : (
    <div className="anime-card-container">
      {data.map((anime: AnimeCardProps) => {
        return animeCard(anime);
      })}
    </div>
  );
};

export default AnimeList;
