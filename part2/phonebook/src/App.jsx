import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState({
    type: '',
    message: '',
    enabled: false,
  })

  useEffect(() => {
    personService
      .getAll()
      .then((response) => setPersons(response.data))
      .catch((error) => console.log(error))
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter setSearch={setSearch} search={search} />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        search={search}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  )
}

export default App
