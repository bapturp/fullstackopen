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
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Number</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {personsToShow.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button onClick={() => handleDelete(person)}>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Persons
