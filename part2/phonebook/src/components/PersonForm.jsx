import { useState } from 'react'
import personService from '../services/persons'
import notification from '../helpers/notification'

const PersonForm = ({ setPersons, persons, setNotification }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSetPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    // Check if the person already exists
    for (const person of persons) {
      if (person.name === newPerson.name) {
        if (person.number !== newPerson.number) {
          // User already exists but the number is different, suggest to replace the number
          const confirm = window.confirm(
            `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
          )
          if (confirm) {
            personService.update(person.id, newPerson).then((response) => {
              setPersons(
                persons
                  .filter((person) => person.name != newPerson.name)
                  .concat(response.data)
              )
            })
          }
        } else {
          // user already exists and the number is the same
          notification(
            setNotification,
            'info',
            `${newPerson.name} is already added to the phonebook.`
          )
        }
        return
      }
    }

    personService.create(newPerson).then((response) => {
      setPersons(persons.concat(response.data))
      notification(setNotification, 'success', `Added ${newPerson.name}`)
    })
  }

  return (
    <>
      <h2>Add a new</h2>
      <form>
        <div>
          <label>Name:</label>
          <input onChange={handleNewName} value={newName}></input>
        </div>
        <div>
          <label>Number:</label>
          <input onChange={handleNewNumber} value={newNumber}></input>
        </div>
        <div>
          <button type="submit" onClick={handleSetPerson}>
            Add
          </button>
        </div>
      </form>
    </>
  )
}

export default PersonForm
