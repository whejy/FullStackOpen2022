import { useState, useEffect } from "react";
import axios from "axios";
import phonebook from "./services/phonebook";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import SearchFilter from "./components/SearchFilter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phonebook.getAll().then((resp) => setPersons(resp));
  }, []);

  const addPhone = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const currentPersonIndex = persons.findIndex(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (currentPersonIndex < 0) {
      phonebook
        .create(newPerson)
        .then((returnedPerson) => setPersons([...persons, returnedPerson]));
    } else {
      if (
        window.confirm(
          `${newName} already exists in the phonebook, replace old number with a new one?`
        )
      ) {
        phonebook
          .update(persons[currentPersonIndex].id, newPerson)
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            )
          );
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
      <h2>Numbers</h2>
      <Persons handleDelete={handleDelete} search={filter} persons={persons} />
    </div>
  );
};

export default App;
