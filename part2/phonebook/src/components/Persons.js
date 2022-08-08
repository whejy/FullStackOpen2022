const Person = ({ persons, handleDelete }) => {
  const confirmDelete = (person) => {
    if (window.confirm(`Delete entry for ${person.name}?`)) {
      return handleDelete(person.id);
    }
  };

  return persons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}{" "}
      <button onClick={() => confirmDelete(person)}>Delete</button>
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
      <Person handleDelete={handleDelete} persons={persons} />
    </>
  );
};

export default Persons;
