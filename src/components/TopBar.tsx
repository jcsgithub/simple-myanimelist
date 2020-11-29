import React from "react";

interface TopBarProps {
  search: string;
  type: string;
  subtype: string;
  sort: string;
  loading: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
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
        <span>Search: </span>
        <input
          onKeyUp={(e) => {
            const search = e.currentTarget.value;
            if (e.key === "Enter" && (search.length >= 3 || !search.length)) {
              app.setLoading(true);
              app.setSearch(search);
            }
          }}
          name="search"
          id="search"
          type="text"
          placeholder="Search anime ..."
        />

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
      </div>

      <div className="sort-container">
        <span className="label-sort">Sort by: </span>
        <select
          onChange={(e) => {
            app.setLoading(true);
            app.setSort(e.target.value);
          }}
          disabled={app.loading}
          name="sort"
          value={app.sort}
          id="sort"
        >
          <option value="rank">Popularity</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default TopBar;
