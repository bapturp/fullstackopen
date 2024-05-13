import { useState } from 'react'

const PersonForm = ({ setPersons }) => {
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

    for (const person of persons) {
      if (person.name === newPerson.name) {
        alert(`${newPerson.name} is already added to the phonebook`)
        return
      }
    }
    setPersons([...persons, newPerson])
  }

  return (
    <>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input onChange={handleNewName} value={newName}></input>
        </div>
        <div>
          number: <input onChange={handleNewNumber} value={newNumber}></input>
        </div>
        <div>
          <button type="submit" onClick={handleSetPerson}>
            add
          </button>
        </div>
      </form>
    </>
  )
}

export default PersonForm
