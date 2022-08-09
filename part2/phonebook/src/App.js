import { useState, useEffect } from "react";
import phonebook from "./services/phonebook";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import SearchFilter from "./components/SearchFilter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    phonebook.getAll().then((resp) => setPersons(resp));
  }, []);

  const addPhone = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const currentPersonIndex = persons.findIndex(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    // Unique person
    if (currentPersonIndex < 0) {
      phonebook.create(newPerson).then((returnedPerson) => {
        setMessage({
          type: "success",
          message: `${returnedPerson.name} added`,
        });

        setPersons([...persons, returnedPerson]);

        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
    } else {
      // Duplicate person
      if (
        window.confirm(
          `${newName} already exists in the phonebook, replace old number with a new one?`
        )
      ) {
        phonebook
          .update(persons[currentPersonIndex].id, newPerson)
          .then((returnedPerson) => {
            setMessage({
              type: "success",
              message: `${returnedPerson.name} updated`,
            });

            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );

            setTimeout(() => {
              setMessage(null);
            }, 3000);
          })

          .catch((err) => {
            setMessage({
              type: "error",
              message: `${newPerson.name} has already been removed from the server`,
            });

            setTimeout(() => {
              setMessage(null);
            }, 3000);

            setPersons(
              persons.filter(
                (person) => person.id !== persons[currentPersonIndex].id
              )
            );
          });
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const handlePhoneChange = (e) => setNewName(e.target.value);

  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleDelete = (id) =>
    phonebook
      .remove(id)
      .then(setPersons(persons.filter((person) => person.id !== id)));

  const handleFilter = (e) => setFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter onChange={handleFilter} />
      <h2>Add New</h2>
      <PersonForm
        phoneChange={handlePhoneChange}
        numberChange={handleNumberChange}
        onSubmit={addPhone}
        newName={newName}
        newNumber={newNumber}
      />
      <Notification message={message} />
      <h2>Numbers</h2>
      <Persons handleDelete={handleDelete} search={filter} persons={persons} />
    </div>
  );
};

export default App;
