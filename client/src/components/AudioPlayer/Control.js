import React from "react";
import "./Control.css";
import { FaPause, FaRandom, FaRedo } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay } from "react-icons/io5";

export default function Control() {
  return (
    <div className="control-wrapper d-flex">
      <div className="action-btn d-flex">
        <FaRandom />
      </div>

      <div className="action-btn d-flex">
        <IoPlaySkipBack />
      </div>

      <div className="play-pause-btn d-flex">
        <IoPlay />
      </div>

      <div className="action-btn d-flex">
        <IoPlaySkipForward />
      </div>

      <div className="action-btn d-flex">
        <FaRedo />
      </div>
    </div>
  );
}
