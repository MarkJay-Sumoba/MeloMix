import React from "react";
import "./SearchResult.css";
import TrackList from "./TrackList";

export default function SearchResult(props) {
  return (
    <div className="search-result">
      <TrackList
        userSearchResults={props.userSearchResults}
        isRemoval={false}
        onAdd={props.onAdd}
      />
    </div>
  );
}
