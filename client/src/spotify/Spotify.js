let accessToken = "";
const clientID = "8d680670cda64a4980551b79eb06e1fc";
const redirectUrl = "http://localhost:3000";

const Spotify = {
  getAccessToken() {
    // Check for the access token
    if (accessToken) {
      console.log("Access token already exists:", accessToken); // DevTool Verification
      return accessToken;
    }

    const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
    const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

    // Check for the access token
    if (tokenInURL && expiryTime) {
      console.log("Access token found in URL:", tokenInURL[1]); // DevTool Verification
      // setting access token and expiry time variables
      accessToken = tokenInURL[1];
      const expiresIn = Number(expiryTime[1]);

      // Setting the access token to expire at the value for expiration time
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      // clearing the url after the access token expires
      window.history.pushState("Access token", null, "/");
      return accessToken;
    }

    // Check for the access token if the first and second check are both false redirect to OAuth
    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
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
          uri: track.uri,
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
};

export { Spotify };
