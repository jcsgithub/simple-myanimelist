export interface AnimeCardProps {
  mal_id: number;
  title: string;
  image_url: string;
  type: string;
  start_date: string;
  rank: number;
}

export const AnimeCard = (
  anime: AnimeCardProps,
  type: string,
  isSearch?: boolean
) => {
  let start_date = anime.start_date;
  if (isSearch) {
    // Fix date since search and normal query has different values for this
    const temp_date = new Date(start_date);
    const month = temp_date.toLocaleString("default", { month: "short" });
    start_date = `${month} ${temp_date.getFullYear()}`;
  }

  return (
    <div key={anime.mal_id} className="anime-card">
      <a href={`/${type}/${anime.mal_id}`}>
        <img className="thumbnail" src={anime.image_url} alt={anime.title} />
        <div className="anime-card-content">
          <h3 className="title">{anime.title}</h3>
          <button>Details</button>
          <h4 className="meta">
            {anime.type}
            <br />
            {start_date}
          </h4>
        </div>
      </a>
    </div>
  );
};

export default AnimeCard;
