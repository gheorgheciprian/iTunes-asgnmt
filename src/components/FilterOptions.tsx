import React, { useState, ChangeEvent, useEffect } from "react";

interface FilterOptionsProps {
  onSearchFilterChange: (
    selectedType: string | null,
    selectedKind: string | null
  ) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  onSearchFilterChange,
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedKind, setSelectedKind] = useState<string | null>(null);

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value === "All" ? null : e.target.value);
  };

  const handleKindChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedKind(e.target.value === "All" ? null : e.target.value);
  };

  useEffect(() => {
    onSearchFilterChange(selectedType, selectedKind);
  }, [onSearchFilterChange, selectedType, selectedKind]);

  return (
    <div className="{/* Add Tailwind styles for FilterOptions container */}">
      <div>
        <label htmlFor="wrapperType">Wrapper Type:</label>
        <select id="wrapperType" onChange={handleTypeChange}>
          <option value="All">All</option>
          <option value="track">Tracks</option>
          <option value="audiobook">Audiobooks</option>
        </select>
      </div>
      <div>
        <label htmlFor="kind">Kind:</label>
        <select id="kind" onChange={handleKindChange}>
          <option value="All">All</option>
          <option value="song">Song</option>
          <option value="podcast">Podcast</option>
          <option value="tv-episode">TV Episode</option>
          <option value="feature-movie">Feature Movie</option>
        </select>
      </div>
    </div>
  );
};

export default FilterOptions;
