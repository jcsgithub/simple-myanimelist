import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<{ mal_id: string }> {}

export const Anime: React.FC<Props> = ({ match }) => {
  return <div>Inside Anime ID: {match.params.mal_id}</div>;
};

export default Anime;
