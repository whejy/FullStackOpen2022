const Person = ({ persons }) => {
  return persons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}
    </div>
  ));
};

const Persons = ({ persons, search }) => {
  if (search) {
    persons = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  return (
    <>
      <Person persons={persons} />
    </>
  );
};

export default Persons;
