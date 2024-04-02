import { iTunesResults } from "./types";

const filterResults = (
  results: iTunesResults[],
  selectedType: string | null,
  selectedKind: string | null
) =>
  results.filter((result) =>
    selectedType
      ? result.wrapperType === selectedType &&
        (selectedKind ? result.kind === selectedKind : true)
      : true
  );

export default filterResults;
