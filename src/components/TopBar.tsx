import React from "react";

interface TopBarProps {
  type: string;
  subtype: string;
  sort: string;
  loading: boolean;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setSubtype: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // sortData: () => boolean;
}

export const TopBar: React.FC<TopBarProps> = (app: TopBarProps) => {
  return (
    <div className="top-container">
      <div className="filter-container">
        <span>Filter by: </span>
        <select
          onChange={(e) => {
            app.setLoading(true);
            app.setType(e.target.value);
            app.setSubtype("");
            // app.setSort("rank");
          }}
          disabled={app.loading}
          name="type"
          value={app.type}
          id="type"
        >
          <option value="anime">Anime</option>
          <option value="manga">Manga</option>
        </select>

        <select
          onChange={(e) => {
            app.setLoading(true);
            app.setSubtype(e.target.value);
          }}
          disabled={app.loading}
          className={app.type === "manga" ? "hidden" : ""}
          name="subtype"
          value={app.subtype}
          id="subtype"
        >
          <option value="">Select one...</option>
          <option value="airing">Airing</option>
          <option value="upcoming">Upcoming</option>
          <option value="movie">Movie</option>
        </select>

        <span className="label-sort">Sort by: </span>
        <select
          name="sort"
          value={app.sort}
          id="sort"
          onChange={(e) => {
            app.setLoading(true);
            app.setSort(e.target.value);
          }}
          disabled={app.loading}
        >
          <option value="rank">Popularity</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className="search-container">
        <span>Search: </span>
        <input type="text" placeholder="Search anime ..." />
      </div>
    </div>
  );
};

export default TopBar;
