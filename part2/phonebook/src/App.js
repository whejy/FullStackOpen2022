import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import SearchFilter from "./components/SearchFilter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((resp) => {
      setPersons(resp.data);
    });
  }, []);

  const addPhone = (e) => {
    e.preventDefault();
    if (
      persons.findIndex(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ) < 0
    ) {
      setPersons([...persons, { name: newName, number: newNumber }]);
    } else {
      alert(`${newName} already exists in the phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  const handlePhoneChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

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
      <Persons search={filter} persons={persons} />
    </div>
  );
};

export default App;
