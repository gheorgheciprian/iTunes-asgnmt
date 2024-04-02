import useFetchSearchResults from "@/api/fetchSearchResults";
import { BroadcastChannel } from "broadcast-channel";
import { channelName, iTunesResults } from "@/utils/types";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

const SearchForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isResultsTabOpen, setIsResultsTabOpen] = useState(false);

  const { results, isLoading, error } = useFetchSearchResults({
    searchTerm,
  });

  let resultsTab: Window | null = null;

  const broadcastChannel = new BroadcastChannel(channelName);

  const broadcastResults = (results: iTunesResults[]) => {
    try {
      broadcastChannel.postMessage(results);
    } catch (error) {
      console.error("Error broadcasting results:", error);
    }
  };

  useEffect(() => {
    if (isResultsTabOpen) {
      broadcastResults(results);
    }

    return () => {
      broadcastChannel.close();
    };
  }, [broadcastChannel, results, isResultsTabOpen]);

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
      <form onSubmit={handleSubmit} className="flex items-center ">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter your search term"
          className="rounded-full"
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Search"}
        </Button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default SearchForm;
