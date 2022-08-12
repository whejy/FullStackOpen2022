const Person = ({ persons, handleDelete }) => {
  return persons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDelete(person)}>Delete</button>
    </div>
  ));
};

const Persons = ({ persons, search, handleDelete }) => {
  if (search) {
    persons = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  return (
    <>
      <h2>Numbers</h2>
      <Person handleDelete={handleDelete} persons={persons} />
    </>
  );
};

export default Persons;
