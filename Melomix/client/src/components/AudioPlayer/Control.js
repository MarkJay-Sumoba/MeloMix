import React from "react";
import "./Control.css";
import { IconContext } from "react-icons";
import { FaPause, FaRandom, FaRedo } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay } from "react-icons/io5";

export default function Control({
  isPlaying,
  setIsPlaying,
  handleNext,
  handlePrev,
}) {
  return (
    <IconContext.Provider value={{ size: "15px", color: "#fff" }}>
      <div className="control-wrapper d-flex">
        <div className="action-btn d-flex">
          <FaRandom />
        </div>

        <div className="action-btn d-flex" onClick={handlePrev}>
          <IoPlaySkipBack />
        </div>

        <div
          className={
            isPlaying ? "play-pause-btn d-flex active" : "play-pause-btn d-flex"
          }
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <FaPause /> : <IoPlay />}
        </div>

        <div className="action-btn d-flex" onClick={handleNext}>
          <IoPlaySkipForward />
        </div>

        <div className="action-btn d-flex">
          <FaRedo />
        </div>
      </div>
    </IconContext.Provider>
  );
}
