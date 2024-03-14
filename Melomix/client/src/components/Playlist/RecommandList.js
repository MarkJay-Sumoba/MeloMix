import React, { useState, useEffect } from "react";
import "./RecommandList.css";
import PropTypes from "prop-types";
import { Spotify } from "../../spotify/Spotify";

export default function RecommandList({ selectedGenre, onTrackSelect }) {
  const [recommandedTracks, setRecommandedTracks] = useState([]);

  const fetchRecommandedTracks = async (genre) => {
    try {
      const response = await Spotify.getRecommandedTracks(genre);
      setRecommandedTracks(response);
      console.log("verify-recommandList : ", response);
    } catch (error) {
      console.error("Error fetching recommanded tracks:", error);
    }
  };

  // send track info to AudioPlayer
  const handlePlayTrack = (track) => {
    onTrackSelect(track);
  };

  useEffect(() => {
    if (selectedGenre) {
      fetchRecommandedTracks(selectedGenre);
    }
  }, [selectedGenre]);

  return (
    <div className="RecommandList">
      <ul>
        {recommandedTracks.map((track) => (
          <li key={track.id} onClick={() => handlePlayTrack(track)}>
            <span>
              <h3> {track.name} </h3>
              <p>
                {track.artist} | {track.album}
              </p>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
RecommandList.propTypes = {
  selectedGenre: PropTypes.string,
};
