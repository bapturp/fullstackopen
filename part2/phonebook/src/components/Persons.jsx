import personService from '../services/persons'
import notification from '../helpers/notification'

const Persons = ({ search, persons, setPersons, setNotification }) => {
  const personsToShow =
    search === '' ? persons : persons.filter((p) => p.name.includes(search))

  const handleDelete = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}`)) {
      personService
        .remove(person.id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== response.data.id))
        })
        .catch((error) => {
          if (error.response.status === 404) {
            notification(
              setNotification,
              'danger',
              `${person.name} has already been removed from the server`
            )
            setPersons(persons.filter((p) => p.id !== person.id))
          } else {
            console.log(error)
          }
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
