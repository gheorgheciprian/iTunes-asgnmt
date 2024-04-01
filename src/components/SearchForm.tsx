import useFetchSearchResults from "@/api/fetchSearchResults";
import { ResultItem } from "@/utils/types";
import { BroadcastChannel } from "broadcast-channel";
import React, { useState, useEffect } from "react";

interface SearchFormProps {
  setSearchResults: (results: ResultItem[]) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isResultsTabOpen, setIsResultsTabOpen] = useState(false);
  const { results, isLoading, error } = useFetchSearchResults({ searchTerm });
  let resultsTab: Window | null = null;
  const channelName = "search-results-channel";
  const broadcastChannel = new BroadcastChannel(channelName);

  const broadcastResults = (results: ResultItem[]) => {
    try {
      broadcastChannel.postMessage(results);
    } catch (error) {
      console.error("Error broadcasting results:", error);
    }
  };

  useEffect(() => {
    setSearchResults(results);
    return () => {
      broadcastChannel.close();
    };
  }, [results, setSearchResults]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openResultsTab();
    broadcastResults(results);
  };

  const openResultsTab = () => {
    if (isResultsTabOpen && resultsTab) {
      resultsTab.focus();
    } else {
      resultsTab = window.open("/results", "resultsTab");
      setIsResultsTabOpen(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter your search term"
        className="{/* Add Tailwind styles */}"
      />
      <button
        type="submit"
        className="{/* Add Tailwind styles */}"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Search"}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default SearchForm;
