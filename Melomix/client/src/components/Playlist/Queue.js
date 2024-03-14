import React from "react";
import "./Queue.css";

function msToTime(duration) {
  var minutes = Math.floor(duration / (1000 * 60));
  var seconds = Math.floor((duration % (1000 * 60)) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function Queue({ tracks, setCurrentIndex }) {
  console.log("Queue called - tracks : ", tracks);
  return (
    <div className="queue-container d-flex">
      <div className="queue d-flex">
        {/* <p className="upNext">Up Next</p> */}
        <p className="upNext">Current PlayTrack</p>
        {/* TODO: Load Current playlist */}
        <div className="queue-list">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="queue-item d-flex"
              onClick={() => setCurrentIndex(track.id)}
            >
              <img
                src={track.albumImages[0].url}
                alt={track.album}
                className="album-image"
              />
              <p className="track-name">
                {track.album} <br />
                {track.artist} <br />
                {track.name} <br />
                Genre: {track.genre} <br />
                Duration: {msToTime(track.duration)} <br />
                Release Date: {track.releaseDate} <br />
              </p>
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
