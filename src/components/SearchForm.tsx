import useFetchSearchResults from "@/api/fetchSearchResults";
import { iTunesResults } from "@/utils/types";
import React, { useState, useEffect } from "react";

interface SearchFormProps {
  setSearchResults: (results: iTunesResults[]) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { results, isLoading, error } = useFetchSearchResults({ searchTerm });

  useEffect(() => {
    setSearchResults(results);
  }, [results, setSearchResults]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
