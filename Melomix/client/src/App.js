import React, { useState, useEffect } from "react";
import "./App.css";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import SearchBar from "./components/Playlist/SearchBar";
import SearchResult from "./components/Playlist/SearchResult";
import PlayList from "./components/Playlist/PlayList";
import GenreSelector from "./components/Playlist/GenreSelector";
import RecommandList from "./components/Playlist/RecommandList";
import Queue from "./components/Playlist/Queue";
import Lyrics from "./components/Lyrics/Lyrics";
import { Spotify } from "./spotify/Spotify";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const handleSelectedGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const [currentTrack, setCurrentTrack] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("Example Playlist Name");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log("Track already exists");
    } else {
      setPlaylistTracks(newTrack);
    }
  }

  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      updatePlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }

  function search(term) {
    Spotify.search(term).then((result) => setSearchResults(result));
    console.log(term);
  }

  function playTrack(track) {
    setPlayingTrack(track.uri);
    setTrack(track);
    setCurrentTrack([track]);
  }

  const [accessToken, setAccessToken] = useState("");
  const [playingTrack, setPlayingTrack] = useState("");
  const [track, setTrack] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = Spotify.getAccessToken();
    setAccessToken(token);
  };

  // set track for AudioPlayer
  const handleSelectedTrack = (track) => {
    const searchTerm = `${track.name} ${track.artist}`;
    console.log("search term - before sending : ", searchTerm);
    Spotify.search(searchTerm)
      .then((result) => {
        setSearchResults(result);
        const foundTrack = result.find(
          (resultTrack) => resultTrack.id === track.id
        );
        if (foundTrack) {
          foundTrack.genre = selectedGenre;
          playTrack(foundTrack);
        } else {
          console.log("Track not found in search results");
        }
      })
      .catch((error) => {
        console.error("Error occurred during search:", error);
      });
  };

  return (
    <div className="main-container d-flex">
      {/* Audio Player */}
      <div className="left-container">
        <div className="logo text-center">
          <h1 className="text-white d-flex justify-content-center p-3 mt-2">
            MeloMix
          </h1>
        </div>
        <AudioPlayer accessToken={accessToken} trackUri={playingTrack} />
        <div className="searchbar-container d-flex">
          <SearchBar onSearch={search} />
        </div>
        <div className="playlist-container d-flex">
          {/* <!-- Add SearchResults component --> */}
          <div className="searchresult-container widget d-flex">
            <SearchResult
              userSearchResults={searchResults}
              onAdd={addTrack}
              playTrack={playTrack}
            />

            {/* TODO: passing searchResults state to the SearchResults component as userSearchResults */}

            <div className="genre-recommand-container widget d-flex">
              <div>
                <GenreSelector onSelectGenre={handleSelectedGenre} />
              </div>
              <div>
                <RecommandList
                  selectedGenre={selectedGenre}
                  onTrackSelect={handleSelectedTrack}
                />
              </div>
            </div>

            {/* <!-- Add a Playlist component --> */}
            <PlayList
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist}
              playTrack={playTrack} // playTrack added by Michael
            />

            {/* TODO: passing playlistName & playlistTracks states to the Playlist component as userSearchResults */}
          </div>
        </div>
      </div>
      {/* TODO: implement lyrics API and make it dynamic */}
      <div className="right-container">
        <div className="lyrics-container text-white">
          <Lyrics
            trackName={track ? track.name : ""}
            artistName={track ? track.artist : ""}
          />
        </div>
        <div className="current-playlist">
          <Queue tracks={currentTrack} setCurrentIndex={setCurrentIndex} />
        </div>
      </div>
    </div>
  );
}

export default App;
