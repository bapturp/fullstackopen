import React from "react";

const Weather = ({ weather }) => {
  console.log(weather);
  return (
    <div>
      <p>Temperature: {weather.main.temp - 273.15} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].main}
      />
      <p>Wind: {weather.wind.speed}</p>
    </div>
  );
};

export default Weather;
