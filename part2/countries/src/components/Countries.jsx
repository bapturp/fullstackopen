import { useState } from 'react'
import OneCountry from './OneCountry'

const Countries = ({ countries }) => {
  const [showCountry, setShowCountry] = useState(null)

  if (!countries) {
    return
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (showCountry) {
    return <OneCountry country={showCountry} />
  }

  return (
    <div>
      {countries.map((c) => (
        <div key={c.name.common}>
          {c.name.common}
          <button onClick={() => setShowCountry(c)}>show</button>
        </div>
      ))}
    </div>
  )
}

export default Countries
