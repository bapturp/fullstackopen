import { useEffect, useState } from 'react'
import axios from 'axios'
import './index.css'
import Countries from './components/Countries'
import OneCountry from './components/OneCountry'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesSearched, setCountriesSearched] = useState([])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    setCountriesSearched(
      countries.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search])

  return (
    <>
      <div>
        <label>Find countries</label>
        <input
          type="text"
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        ></input>
      </div>
      {countriesSearched.length === 1 ? (
        <OneCountry country={countriesSearched[0]} />
      ) : (
        <Countries countries={countriesSearched} />
      )}
    </>
  )
}

export default App
