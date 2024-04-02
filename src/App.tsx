import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import ResultsList from "./components/ResultsList";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/results" element={<ResultsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
