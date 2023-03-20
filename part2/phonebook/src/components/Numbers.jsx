const Numbers = ({ displayedPeople, handleDelete }) => {
  return (
    <div>
      {" "}
      {displayedPeople ? (
        displayedPeople.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </p>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Numbers;
