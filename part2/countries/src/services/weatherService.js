import axios from "axios";

const api_key = process.env.REACT_APP_OWM_API_KEY;

const getCityCoordonates = (country) => {
  const city_name = country.capital[0];
  // const state_code = "";
  const country_code = country.cca3;
  const limit = 1;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${country_code}&limit=${limit}&appid=${api_key}`;

  return axios(url)
    .then((response) => response.data[0])
    .catch((error) => console.error(error));
};

const getCountryCapitalWeather = (country) =>
  getCityCoordonates(country)
    .then(({ lat, lon }) =>
      axios(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
      )
    )
    .then((response) => response)
    .catch((error) => console.error(error));

const weatherService = { getCountryCapitalWeather };

export default weatherService;
