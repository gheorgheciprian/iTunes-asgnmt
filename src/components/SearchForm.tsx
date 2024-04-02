import useFetchSearchResults from "@/api/fetchSearchResults";
import { BroadcastChannel } from "broadcast-channel";
import { channelName, iTunesResults } from "@/utils/types";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

const SearchForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isResultsTabOpen, setIsResultsTabOpen] = useState(false);
  const { results, isLoading, error } = useFetchSearchResults({
    searchTerm,
  });

  let resultsTab: Window | null = null;

  const broadcastChannel = new BroadcastChannel(channelName);

  console.log(results);
  const broadcastResults = (results: iTunesResults[]) => {
    try {
      broadcastChannel.postMessage(results);
    } catch (error) {
      console.error("Error broadcasting results:", error);
    }
  };

  useEffect(() => {
    broadcastResults(results);

    return () => {
      broadcastChannel.close();
    };
  }, [broadcastChannel, results]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openResultsTab();
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
    <div className="h-screen w-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter your search term"
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
    </div>
  );
};

export default SearchForm;
