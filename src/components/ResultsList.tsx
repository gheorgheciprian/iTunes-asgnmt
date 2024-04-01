import { ResultItem } from "@/utils/types";
import React, { useEffect, useState } from "react";

interface ResultsListProps {}

const ResultsList: React.FC<ResultsListProps> = () => {
  const [searchResults, setSearchResults] = useState<ResultItem[]>([]);
  const channelName = "search-results-channel";

  useEffect(() => {
    const broadcastChannel = new BroadcastChannel(channelName);

    broadcastChannel.onmessage = (event) => {
      setSearchResults(event.data);
    };

    return () => {
      broadcastChannel.close();
    };
  }, []);

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
