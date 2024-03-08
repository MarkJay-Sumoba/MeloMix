import React, { useState } from "react";
import "./App.css";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import SearchBar from "./components/Playlist/SearchBar";
import SearchResult from "./components/Playlist/SearchResult";
import PlayList from "./components/Playlist/PlayList";
import { Spotify } from "./spotify/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: "Example Track Name 1",
      artist: "Example Track Artist 1",
      album: "Example Track Album 1",
      id: 1,
    },
    {
      name: "Example Track Name 2",
      artist: "Example Track Artist 2",
      album: "Example Track Album 2",
      id: 2,
    },
  ]);
  const [playlistName, setPlaylistName] = useState("Example Playlist Name");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "Example Playlist Name 1",
      artist: "Example Playlist Artist 1",
      album: "Example Playlist Album 1",
      id: 11,
    },
    {
      name: "Example Playlist Name 2",
      artist: "Example Playlist Artist 2",
      album: "Example Playlist Album 2",
      id: 22,
    },
    {
      name: "Example Playlist Name 3",
      artist: "Example Playlist Artist 3",
      album: "Example Playlist Album 3",
      id: 33,
    },
  ]);

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

  return (
    <div className="main-container d-flex">
      {/* Audio Player */}
      <div className="left-container">
        <AudioPlayer />
        <div className="searchbar-container d-flex">
          <SearchBar onSearch={search} />
        </div>
        <div className="playlist-container d-flex">
          {/* <!-- Add SearchResults component --> */}
          <div className="searchresult-container d-flex">
            <SearchResult userSearchResults={searchResults} onAdd={addTrack} />

            {/* TODO: passing searchResults state to the SearchResults component as userSearchResults */}

            {/* <!-- Add a Playlist component --> */}
            <PlayList
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist}
            />

            {/* TODO: passing playlistName & playlistTracks states to the Playlist component as userSearchResults */}
          </div>
        </div>
      </div>
      {/* TODO: implement lyrics API and make it dynamic */}
      <div className="right-container">
        <h2>Example of Lyrics</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}

export default App;
