import React, { useEffect, useState } from "react";
import { channelName, iTunesResults } from "@/utils/types";
import ResultItem from "./ResultItem";
import RenderIfVisible from "react-render-if-visible";
import { Separator } from "./ui/separator";

const ResultsList: React.FC = () => {
  const [searchResults, setSearchResults] = useState<iTunesResults[]>([]);

  useEffect(() => {
    const broadcastChannel = new BroadcastChannel(channelName);

    broadcastChannel.onmessage = (event) => {
      setSearchResults(event.data.data);
    };

    return () => {
      broadcastChannel.close();
    };
  }, []);

  return (
    <div>
      <RenderIfVisible>
        <ul className="{/* Add Tailwind styles for list */}">
          {searchResults.map((result) => (
            <div>
              <ResultItem key={result.trackId} {...result} />
              <Separator className="my-4 bg-gray-50" />
            </div>
          ))}
        </ul>
      </RenderIfVisible>
    </div>
  );
};

export default ResultsList;
