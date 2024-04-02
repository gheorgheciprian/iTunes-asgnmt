import React, { ChangeEvent } from "react";

interface FilterOptionsProps {
  mediaTypeFilter: string;
  setMediaTypeFilter: (newFilter: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  mediaTypeFilter,
  setMediaTypeFilter,
}) => {
  return (
    <div className="{/* Add Tailwind styles for FilterOptions container */}">
      <label
        htmlFor="mediaType"
        className="{/* Add Tailwind styles for label */}"
      >
        Media Type:
      </label>
      <select
        id="mediaType"
        value={mediaTypeFilter}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setMediaTypeFilter(e.target.value)
        }
      >
        <option value="">All Media Types</option>
        <option value="track">Music</option>
        <option value="audiobook">Audiobook</option>
      </select>
    </div>
  );
};

export default FilterOptions;
