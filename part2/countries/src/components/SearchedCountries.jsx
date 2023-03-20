const SearchedCountries = ({ countries, setSearchQuery }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  }

  const orderedCountries = countries.sort(
    (a, b) => a.name.common > b.name.common
  );

  return (
    <div>
      <ul>
        {orderedCountries.map((country) => (
          <li key={country.name.official}>
            {country.name.common}{" "}
            <button onClick={() => setSearchQuery(country.name.common)}>
              show
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchedCountries;
