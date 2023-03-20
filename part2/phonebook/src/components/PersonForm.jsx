// import areTheseObjectsEqual from "../services/areTheseObjectsEqual";
import personsService from "../services/persons";

const PersonForm = ({
  newName,
  setNewName,
  newPhone,
  setNewPhone,
  persons,
  setPersons,
  setInfoMessage,
}) => {
  const handleInfoMessage = (person) => {
    setInfoMessage(`Added ${person.name}`);
    setTimeout(() => setInfoMessage(null), 5000);
  };

  const handlePersonChange = (event) => {
    event.preventDefault();

    const newPerson = { name: newName, number: newPhone };

    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (existingPerson === undefined) {
      personsService
        .create(newPerson)
        .then((data) => {
          setPersons([...persons, data]);
          handleInfoMessage(data);
        })
        .catch((error) => console.error(error));

      setNewName("");
      setNewPhone("");

      return;
    }

    if (
      window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personsService.update(existingPerson.id, newPerson).then((response) => {
        setPersons(
          persons.map((person) =>
            person.id === existingPerson.id
              ? { ...person, ...response }
              : person
          )
        );
        handleInfoMessage(`Modified ${response.name}`);
      });
    }
  };

  return (
    <form onSubmit={handlePersonChange}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          placeholder="Ada Lovelace"
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newPhone}
          onChange={(event) => setNewPhone(event.target.value)}
          placeholder="(604) 725 7504"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
