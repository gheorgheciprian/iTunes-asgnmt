import { iTunesResults } from "@/utils/types";
import React from "react";

const ResultItem: React.FC<iTunesResults> = ({
  trackId,
  artworkUrl30,
  trackName,
  artistName,
}) => {
  return (
    <li key={trackId} className="{/* Add Tailwind styles for item */}">
      <img
        src={artworkUrl30}
        alt={trackName}
        className="{/* Add Tailwind styles for image */}"
      />
      <h3>{trackName}</h3>
      <p>By: {artistName}</p>
    </li>
  );
};

export default ResultItem;
