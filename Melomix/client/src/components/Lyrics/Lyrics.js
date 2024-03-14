import React, { useState, useEffect } from "react";
import "./Lyrics.css";
import { Spotify } from "../../spotify/Spotify";

export default function Lyrics({ trackName, artistName }) {
  const [lyrics, setLyrics] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchLyrics = async () => {
      setLoading(true);
      try {
        if (trackName && artistName) {
          const lyricsData = await Spotify.getLyricsByTrackNameAndArtist(
            trackName,
            artistName
          );
          if (isMounted) {
            setLyrics(lyricsData);
          }
        } else {
          throw new Error("Track name and artist name are required.");
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (trackName && artistName) {
      fetchLyrics();
    }

    return () => {
      isMounted = false;
    };
  }, [trackName, artistName]);

  return (
    <div className="Lyrics">
      <h2>Lyrics</h2>
      {loading && <p className="Lyrics-loading">Loading...</p>}
      {error ? (
        <p className="Lyrics-error">Error: {error}</p>
      ) : (
        <p className="Lyrics-text">{lyrics || "No lyrics found"}</p>
      )}
    </div>
  );
}
