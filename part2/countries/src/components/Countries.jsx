const Countries = ({ countries }) => {
  if (!countries) {
    return
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <div>
      {countries.map((c) => (
        <div key={c.name.common}>{c.name.common}</div>
      ))}
    </div>
  )
}

export default Countries
