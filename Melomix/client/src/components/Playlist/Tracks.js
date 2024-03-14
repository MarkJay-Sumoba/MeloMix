import React from "react";
import { FaPlay } from "react-icons/fa";
import "./Tracks.css";

export default function Tracks(props) {
  // Function to render add/remove button based on isRemoval prop
  function renderAction() {
    if (props.isRemoval) {
      return (
        <button className="track-action" onClick={passTrackToRemove}>
          -
        </button>
      );
    } else {
      return (
        <>
          <button className="track-action" onClick={passTrack}>
            +
          </button>

          <button className="track-action play" onClick={handlePlay}>
            <FaPlay />
          </button>
        </>
      );
    }
  }

  function passTrack() {
    props.onAdd(props.track);
  }

  function passTrackToRemove() {
    props.onRemove(props.track);
  }

  // Function to call playTrack prop with the current track's URI
  function handlePlay() {
    console.log("Attempting to play track:", props.track.name);

    if (props.playTrack) {
      console.log("Track URI:", props.track);
      props.playTrack(props.track);
    } else {
      console.log(props.track);
      console.log("playTrack function:", props.playTrack);
      console.error("playTrack function is not provided.");
    }
  }

  return (
    <div className="track">
      <div className="track-info">
        {/* <h3>Bruno Mars</h3> */}
        <h3 className="track-name text-white">{props.track.name}</h3>
        {/* <p>Lazy Song | Doo-Wops & Hooligans (2010)</p> */}
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {/* <button className="track-action">+</button> */}
      {renderAction()}
    </div>
  );
}
