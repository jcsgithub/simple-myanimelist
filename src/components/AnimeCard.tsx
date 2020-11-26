import React from "react";

interface Props {
  mal_id: number;
  title: string;
  image_url: string;
  type: string;
  start_date: string;
}

export const AnimeCard: React.FC<Props> = ({
  mal_id,
  title,
  image_url,
  type,
  start_date,
}) => {
  return (
    <div className="anime-card">
      <a href={"/anime/" + mal_id}>
        <img className="thumbnail" src={image_url} alt={title} />
        <div className="anime-card-content">
          <h3 className="title">{title}</h3>
          <button>Details</button>
          <h4 className="meta">
            {type}
            <br />
            {start_date}
          </h4>
        </div>
      </a>
    </div>
  );
};

export default AnimeCard;
