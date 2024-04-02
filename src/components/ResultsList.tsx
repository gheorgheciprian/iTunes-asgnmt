import React, { useEffect, useState } from "react";
import { channelName, iTunesResults } from "@/utils/types";
import ResultItem from "./ResultItem";
import RenderIfVisible from "react-render-if-visible";
import FilterOptions from "./FilterOptions";

const ResultsList: React.FC = () => {
  const [searchResults, setSearchResults] = useState<iTunesResults[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedKind, setSelectedKind] = useState<string | null>(null);

  useEffect(() => {
    const broadcastChannel = new BroadcastChannel(channelName);

    broadcastChannel.onmessage = (event) => {
      setSearchResults(event.data.data);
      sessionStorage.setItem("searchResults", JSON.stringify(searchResults));
    };

    return () => {
      broadcastChannel.close();
    };
  }, []);

  const handleFilterChange = (
    newType: string | null,
    newKind: string | null
  ) => {
    setSelectedType(newType);
    setSelectedKind(newKind);
  };

  return (
    <div>
      <FilterOptions onSearchFilterChange={handleFilterChange} />
      <RenderIfVisible>
        <ul className="{/* Add Tailwind styles for list */}">
          {searchResults
            .filter(
              (result) =>
                (!selectedType || result.wrapperType === selectedType) &&
                (!selectedKind || result.kind === selectedKind)
            )
            .map((result) => (
              <div key={result.trackId}>
                <ResultItem {...result} />
              </div>
            ))}
        </ul>
      </RenderIfVisible>
    </div>
  );
};

export default ResultsList;
