import React from "react";
import weatherService from "../services/weatherService";
import { useState, useEffect } from "react";
import Weather from "./Weather";

const OneCountry = ({ countries }) => {
  const [weather, setWeather] = useState(null);

  const { name, capital, area, languages, flags } = countries[0];

  useEffect(() => {
    weatherService
      .getCountryCapitalWeather(countries[0])
      .then((response) => setWeather(response.data))
      .catch((error) => console.error(error));
  }, [countries]);

  return (
    <div>
      <h2>{name.common}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt={flags.alt} />
      <h3>Weather in {capital}</h3>
      {weather ? <Weather weather={weather} /> : "Loading..."}
    </div>
  );
};

export default OneCountry;
