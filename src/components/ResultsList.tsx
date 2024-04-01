import { ResultItem } from "@/utils/types";
import React from "react";

interface ResultsListProps {
  results: ResultItem[];
}

const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  return (
    <div>
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul className="{/* Add Tailwind styles for list */}">
          {results.map((result) => (
            <li
              key={result.trackId}
              className="{/* Add Tailwind styles for item */}"
            >
              <img
                src={result.artworkUrl100}
                alt={result.trackName}
                className="{/* Add Tailwind styles for image */}"
              />
              <h3>{result.trackName}</h3>
              <p>By: {result.artistName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsList;
