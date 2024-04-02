import React, { useEffect, useState } from "react";
import { FilterValues, channelName, iTunesResults } from "@/utils/types";
import ResultItem from "./ResultItem";
import RenderIfVisible from "react-render-if-visible";
import FilterOptions from "./FilterOptions";

const ResultsList: React.FC = () => {
  const [searchResults, setSearchResults] = useState<iTunesResults[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedKind, setSelectedKind] = useState<string | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem("searchResults");
    console.log(storedResults);
    if (storedResults) {
      setSearchResults(JSON.parse(storedResults));
    }

    const broadcastChannel = new BroadcastChannel(channelName);

    broadcastChannel.onmessage = (event) => {
      setSearchResults(event.data.data);
      sessionStorage.setItem("searchResults", JSON.stringify(event.data.data));
    };

    return () => {
      broadcastChannel.close();
    };
  }, []);

  const handleFilterChange = (
    newType: FilterValues | null,
    newKind: FilterValues | null
  ) => {
    setSelectedType(newType);
    setSelectedKind(newKind);
  };

  return (
    <div className="h-screen w-screen flex p-10">
      <div className="fixed top-1/2 -translate-y-1/2 left-0 w-1/3 ml-10">
        <FilterOptions
          className="p-4"
          onSearchFilterChange={handleFilterChange}
          selectedType={selectedType as FilterValues}
          selectedKind={selectedKind as FilterValues}
        />
      </div>
      <div className="h-screen w-2/3 ml-auto">
        <ul>
          {searchResults
            .filter(
              (result) =>
                (!selectedType || result.wrapperType === selectedType) &&
                (!selectedKind || result.kind === selectedKind)
            )
            .map((result) => (
              <RenderIfVisible defaultHeight={900}>
                <li key={result.trackId}>
                  <ResultItem {...result} />
                </li>
              </RenderIfVisible>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultsList;
