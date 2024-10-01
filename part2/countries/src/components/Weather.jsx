import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null)

  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
      .then((response) => {
        setWeather(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  if (!weather) return

  const temp = (Math.round((weather.main.temp - 273.15) * 100) / 100).toFixed(2)
  const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature {temp} Celcius</p>
      <img src={icon} />
      <p>wind {weather.wind.speed}</p>
    </div>
  )
}

export default Weather
