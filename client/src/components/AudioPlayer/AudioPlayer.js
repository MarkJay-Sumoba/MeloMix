import React, { useState } from "react";
import "./AudioPlayer.css";
import { FaVolumeMute, FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import Wave from "./Wave";
import Control from "./Control";
import Progress from "./Progress";

export default function AudioPlayer() {
  // TODO: Bind it with the track as it progress
  const progress = 40;

  // Volume Control
  const [volume, setVolume] = useState(0.5);
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="player-container d-flex">
      <div className="control-container d-flex">
        <p className="song-title">Twinkle Twinkle Little Star</p>
        <p className="song-artist">Twinkle</p>

        <div className="songtrack d-flex">
          <div className="song-duration d-flex">
            <p className="duration">0:00</p>
            {/* add wave component */}
            <Wave />
            {/* TODO: Changes for ea. track song */}
            <p className="duration">0:30</p>
          </div>
          {/* Add ProgressBar component */}
          <Progress progress={progress} />
          {/* Add Controls component */}
          <Control />
          {/* Add Volume control */}
          <div className="volume-control">
            {volume === 0 ? (
              <FaVolumeMute />
            ) : volume > 0.5 ? (
              <FaVolumeUp />
            ) : (
              <FaVolumeDown />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
