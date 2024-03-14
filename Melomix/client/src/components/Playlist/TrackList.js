import React from "react";
import "./TrackList.css";
import Track from "./Tracks";

export default function TrackList(props) {
  return (
    <div className="Tracklist">
      {/* <!-- You will add a map method that renders a set of Track components  --> */}
      {props.userSearchResults.map((track) => (
        <Track
          track={track}
          key={track.id}
          isRemoval={props.isRemoval}
          onAdd={props.onAdd}
          onRemove={props.onRemove}
          playTrack={props.playTrack} // to play track added by Michael
        />
      ))}
    </div>
  );
}
