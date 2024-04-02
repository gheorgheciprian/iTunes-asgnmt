import { iTunesResults } from "@/utils/types";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

const ResultItem: React.FC<iTunesResults> = ({
  artworkUrl60,
  trackName,
  artistName,
  wrapperType,
  kind,
}) => {
  return (
    <Card className="rounded-xl my-2 max-w-sm">
      <CardHeader>{trackName}</CardHeader>
      <CardContent>
        <div className="flex items-center">
          <img src={artworkUrl60} alt={trackName} className="pr-4" />
          <div>
            <div> By: {artistName}</div>
            <div>Wrapper-type: {wrapperType}</div>
            <div>Type: {kind}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultItem;
