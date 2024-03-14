import React from "react";
import "./PlayList.css";
import TrackList from "./TrackList";

export default function PlayList(props) {
  function handleNameChange({ target }) {
    props.onNameChange(target.value);
  }
  return (
    <div className="Playlist">
      <input defaultValue={"New Playlist"} onChange={handleNameChange} />
      {/* <!-- Add a TrackList component --> */}
      <TrackList
        userSearchResults={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}
        playTrack={props.playTrack} // playTrack added by Michael
      />
      <button className="Playlist-save" onClick={props.onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}
