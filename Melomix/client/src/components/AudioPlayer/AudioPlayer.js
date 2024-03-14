import React, { useState, useEffect } from "react";
import "./AudioPlayer.css";
import SpotifyPlayer from "react-spotify-web-playback";

export default function AudioPlayer({ accessToken, trackUri }) {
  const [volume, setVolume] = useState(0.5);
  const [play, setPlay] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const handleToggleRandom = () => {
    setIsRandom(!isRandom);
  };

  const handleToggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  // Auto-play when trackUri changes
  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;

  return (
    <div className="player-container">
      <div className="spotify-player d-flex">
        {/* Integrate SpotifyPlayer */}
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
          }}
          play={play}
          uris={trackUri ? [trackUri] : []}
          styles={{
            bgColor: "transparent",
            color: "#fff",
            loaderColor: "#1cb954",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
            height: "150px",
            padding: "20px",
          }}
          volume={volume}
          playOptions={{
            shuffle: isRandom,
            repeat_mode: isRepeat ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}
