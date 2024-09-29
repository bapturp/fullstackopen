import personService from '../services/persons'

const Persons = ({ search, persons, setPersons }) => {
  const personsToShow =
    search === '' ? persons : persons.filter((p) => p.name.includes(search))

  const handleDelete = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}`)) {
      personService.remove(person.id).then((response) => {
        setPersons(persons.filter((person) => person.id !== response.data.id))
      })
    }
  }

  return (
    <>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person)}>delete</button>
        </div>
      ))}
    </>
  )
}

export default Persons
