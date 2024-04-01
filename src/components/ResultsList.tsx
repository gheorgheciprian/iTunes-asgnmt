import { iTunesResults } from "@/utils/types";
import React from "react";
import ResultItem from "./ResultItem";

interface ResultsListProps {
  results: iTunesResults[];
}

const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  return (
    <div>
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul className="{/* Add Tailwind styles for list */}">
          {results.map((result) => (
            <ResultItem key={result.trackId} {...result} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsList;
