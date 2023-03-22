import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personsService
        .remove(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
  };

  const displayedPeople = nameFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />

      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        setNotification={setNotification}
      />

      <h2>Numbers</h2>
      <Numbers displayedPeople={displayedPeople} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
