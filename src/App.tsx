import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import SearchForm from "./components/SearchForm";
import ResultsList from "./components/ResultsList";
import { iTunesResults } from "./utils/types";

function App() {
  const [searchResults, setSearchResults] = useState<iTunesResults[]>([]);

  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchForm setSearchResults={setSearchResults} />
                <ResultsList results={searchResults} />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
