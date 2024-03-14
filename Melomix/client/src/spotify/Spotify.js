let accessToken = "";
const clientID = "8d680670cda64a4980551b79eb06e1fc";
const apiKey = "928c4ed0227d84edd900389d3332a94c";
const redirectUrl = "http://localhost:3000";

const SCOPE = encodeURIComponent(
  "playlist-modify-public user-modify-playback-state user-read-playback-state user-read-currently-playing streaming app-remote-control user-read-email user-read-private"
);

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      console.log("Access token already exists:", accessToken); // DevTool Verification
      return accessToken;
    }

    const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
    const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenInURL && expiryTime) {
      console.log("Access token found in URL:", tokenInURL[1]); // DevTool Verification
      accessToken = tokenInURL[1];
      const expiresIn = Number(expiryTime[1]);

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access token", null, "/");
      return accessToken;
    }

    // Updated the redirect URI to include the new scope
    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=${SCOPE}&redirect_uri=${encodeURIComponent(
      redirectUrl
    )}`;
    window.location = redirect;
  },

  // Search for tracks https://developer.spotify.com/documentation/web-api/reference/search
  search(term) {
    accessToken = Spotify.getAccessToken();
    console.log("Searching for tracks with term:", term); // DevTool Verification
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse) {
          console.error("Response error");
        }
        console.log("Received search response:", jsonResponse); // DevTool Verification
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          duration: track.duration_ms,
          releaseDate: track.album.release_date,
          albumImages: track.album.images,
          uri: track.uri,
          genre: track.genre,
        }));
      });
  },

  // Create playlist https://developer.spotify.com/documentation/web-api/reference/create-playlist
  savePlaylist(name, trackUris) {
    if (!name || !trackUris) return;
    const aToken = Spotify.getAccessToken();
    const header = { Authorization: `Bearer ${aToken}` };
    let userId;
    return fetch(`https://api.spotify.com/v1/me`, { headers: header })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        let playlistId;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: header,
          method: "post",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
              {
                headers: header,
                method: "post",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  },

  // Get recommended tracks based on a selected genre
  getRecommandedTracks(genre) {
    const accessToken = Spotify.getAccessToken();
    console.log("getRecommandedTracks is called!! :", genre);
    return fetch(
      `https://api.spotify.com/v1/recommendations?limit=10&seed_genres=${genre}`,
      { method: "GET", headers: { Authorization: `Bearer ${accessToken}` } }
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse || !jsonResponse.tracks) {
          console.error("Error fetching recommended tracks");
          return [];
        }

        const sortedTracks = jsonResponse.tracks
          .map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            popularity: track.popularity,
          }))
          .sort((a, b) => b.popularity - a.popularity);
        return sortedTracks;
      });
  },

  getLyrics(trackId) {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // CORS Proxy
    const musixmatchUrl = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${apiKey}`;
    console.log("Fetching lyrics for trackId:", trackId);
    return fetch(proxyUrl + musixmatchUrl, {
      headers: {
        "X-Requested-With": "XMLHttpRequest", // Some CORS proxies require this header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Musixmatch response:", data); // Log the response for debugging
        if (
          !data ||
          !data.message ||
          !data.message.body ||
          !data.message.body.lyrics ||
          !data.message.body.lyrics.lyrics_body
        ) {
          console.error(
            "No lyrics found or incorrect response structure:",
            data
          );
          throw new Error("No lyrics found");
        }
        return data.message.body.lyrics.lyrics_body;
      })
      .catch((error) => {
        console.error("Error fetching lyrics:", error);
        throw error; // Rethrow after logging or handle differently if needed
      });
  },

  getLyricsByTrackNameAndArtist(trackName, artistName) {
    const encodedTrackName = encodeURIComponent(trackName);
    const encodedArtistName = encodeURIComponent(artistName);
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // CORS Proxy
    // Prepend the proxy URL to the Musixmatch API request URL
    const searchUrl = `${proxyUrl}https://api.musixmatch.com/ws/1.1/track.search?q_track=${encodedTrackName}&q_artist=${encodedArtistName}&apikey=${apiKey}&s_track_rating=desc`;

    return fetch(searchUrl, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          !data ||
          !data.message ||
          !data.message.body ||
          !data.message.body.track_list ||
          data.message.body.track_list.length === 0
        ) {
          console.error("Search URL:", searchUrl); // Log the search URL for debugging
          throw new Error(
            `No matching tracks found on Musixmatch for "${trackName}" by "${artistName}".`
          );
        }
        const musixmatchTrackId =
          data.message.body.track_list[0].track.track_id;
        return this.getLyrics(musixmatchTrackId);
      })
      .catch((error) => {
        console.error("Error finding track on Musixmatch:", error);
        throw error;
      });
  },
};

export { Spotify };
