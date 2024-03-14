import React, { useState, useEffect } from "react";
import "./GenreSelector.css";

export default function GenreSelector({ onSelectGenre }) {
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    setSelectedGenre(selectedGenre);
  };

  const handleApplyGenre = (event) => {
    event.preventDefault();
    //  Use the current value of selectedGenre directly
    onSelectGenre(selectedGenre !== "" ? [selectedGenre] : []);
  };

  useEffect(() => {
    // Use the effect to handle the side effect of the button click
    // This will be called after the render is committed to the screen
    console.log("Selected Genre:", selectedGenre);
  }, [selectedGenre]);

  return (
    <div className="genre-selector-container">
      <div>
        <h3 className="recommend-title">Recommendation</h3>
      </div>
      <div>
        <label className="text-white">Select Genre: &nbsp; </label>
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="" hidden>
            Select a genre
          </option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="r-n-b">RnB</option>
          <option value="piano">Piano</option>
          <option value="jazz">Jazz</option>
          <option value="k-pop">K-Pop</option>
          <option value="samba ">Samba</option>
          <option value="opera">Opera</option>
        </select>
      </div>
      <div className="genre-btn text-center">
        <button type="button" onClick={handleApplyGenre}>
          Apply Genre
        </button>
      </div>
    </div>
  );
}
