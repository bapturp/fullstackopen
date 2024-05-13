const Persons = ({ search, persons }) => {
  const personsToShow =
    search === '' ? persons : persons.filter((p) => p.name.includes(search))

  return (
    <>
      {personsToShow.map((p) => (
        <div key={p.name}>
          {p.name} {p.number}
        </div>
      ))}
    </>
  )
}

export default Persons
