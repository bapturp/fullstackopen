import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const baseURL = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get(baseURL).then((response) => setPersons(response.data))
  }, [])

  const [search, setSearch] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearch={setSearch} search={search} />
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search}></Persons>
    </div>
  )
}

export default App
