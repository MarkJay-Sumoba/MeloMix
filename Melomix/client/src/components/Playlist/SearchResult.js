import React from "react";
import "./SearchResult.css";
import TrackList from "./TrackList";

export default function SearchResult(props) {
  return (
    <div className="search-result">
      <h3 className="search-title">Search Results</h3>
      <TrackList
        userSearchResults={props.userSearchResults}
        isRemoval={false}
        onAdd={props.onAdd}
        playTrack={props.playTrack}
      />
    </div>
  );
}
