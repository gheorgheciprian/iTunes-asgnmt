import { FilterValues } from "@/utils/types";
import React, { ChangeEvent } from "react";

interface FilterOptionsProps {
  onSearchFilterChange: (
    newType: FilterValues | null,
    newKind: FilterValues | null
  ) => void;
  selectedType: FilterValues | null;
  selectedKind: FilterValues | null;
  className: string;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  onSearchFilterChange,
  selectedType,
  selectedKind,
  className,
}) => {
  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSearchFilterChange(
      e.target.value === FilterValues.All
        ? null
        : (e.target.value as FilterValues),
      selectedKind
    );
  };

  const handleKindChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSearchFilterChange(
      selectedType,
      e.target.value === FilterValues.All
        ? null
        : (e.target.value as FilterValues)
    );
  };

  return (
    <div className={className}>
      <div>
        <label htmlFor="wrapperType">Wrapper Type:</label>
        <select id="wrapperType" onChange={handleTypeChange}>
          <option value={FilterValues.All}>All</option>
          <option value={FilterValues.Track}>Tracks</option>
          <option value={FilterValues.Audiobook}>Audiobooks</option>
        </select>
      </div>
      <div>
        <label htmlFor="kind">Kind:</label>
        <select id="kind" onChange={handleKindChange}>
          <option value={FilterValues.All}>All</option>
          <option value={FilterValues.Song}>Song</option>
          <option value={FilterValues.Podcast}>Podcast</option>
          <option value={FilterValues.TVEpisode}>TV Episode</option>
          <option value={FilterValues.FeatureMovie}>Feature Movie</option>
        </select>
      </div>
    </div>
  );
};

export default FilterOptions;
