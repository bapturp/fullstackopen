import { useEffect, useState } from "react";
import axios from "axios";
import SearchedCountries from "./components/SearchedCountries";
import OneCountry from "./components/OneCountry";

const App = () => {
  const [fetchedCountries, setFetchedCountries] = useState([]); // countries fetched from API
  const [searchQuery, setSearchQuery] = useState(""); // Search text
  const [searchResults, setSearchResults] = useState([]); // Search results

  useEffect(() => {
    // fetch countries once on load
    axios("http://localhost:3001/countries")
      .then((response) => setFetchedCountries(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults([]);
      return;
    }

    setSearchResults(
      fetchedCountries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, fetchedCountries]);

  return (
    <div>
      <form>
        <label>find countries </label>
        <input
          type="search"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </form>
      {searchResults.length === 1 ? (
        <OneCountry countries={searchResults} />
      ) : (
        <SearchedCountries
          countries={searchResults}
          setSearchQuery={setSearchQuery}
        />
      )}
    </div>
  );
};

export default App;
