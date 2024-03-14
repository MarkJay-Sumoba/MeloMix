import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar(props) {
  const [term, setTerm] = useState("");

  function passTerm() {
    props.onSearch(term);
  }

  function handleTermChange({ target }) {
    setTerm(target.value);
  }

  return (
    <div className="searchbar d-flex">
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange}
      />
      <button className="search-btn" onClick={passTerm}>
        SEARCH
      </button>
    </div>
  );
}
