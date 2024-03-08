import React from "react";
import "./Tracks.css";

export default function Tracks(props) {
  function renderAction() {
    if (props.isRemoval) {
      return (
        <button className="track-action" onClick={passTrackToRemove}>
          -
        </button>
      );
    } else {
      return (
        <button className="track-action" onClick={passTrack}>
          +
        </button>
      );
    }
  }

  function passTrack() {
    props.onAdd(props.track);
  }

  function passTrackToRemove() {
    props.onRemove(props.track);
  }

  return (
    <div className="track">
      <div className="track-info">
        {/* <h3>Bruno Mars</h3> */}
        <h3>{props.track.name}</h3>
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
