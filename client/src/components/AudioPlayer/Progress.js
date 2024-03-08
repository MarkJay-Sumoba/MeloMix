import React from "react";
import "./Progress.css";

export default function Progress({ progress }) {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
}
