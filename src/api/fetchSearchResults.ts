import { iTunesResults } from "@/utils/types";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

interface UseFetchSearchResultsProps {
  searchTerm: string;
}

interface FetchSearchResults {
  results: iTunesResults[];
  isLoading: boolean;
  error: string | null;
}

const useFetchSearchResults = ({
  searchTerm,
}: UseFetchSearchResultsProps): FetchSearchResults => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<iTunesResults[]>([]);

  const fetchData = useCallback(async () => {
    if (!searchTerm) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${searchTerm.trim()}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      setError("Error fetching data, please try again");
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  const debouncedFetchData = useCallback(debounce(fetchData, 500), [fetchData]);

  useEffect(() => {
    debouncedFetchData();
    return () => debouncedFetchData.cancel();
  }, [debouncedFetchData]);

  return { results, isLoading, error };
};

export default useFetchSearchResults;
