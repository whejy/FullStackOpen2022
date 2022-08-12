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
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    phonebook.getAll().then((resp) => setPersons(resp));
  }, []);

  const notify = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addPhone = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    setNewName("");
    setNewNumber("");

    const currentPersonIndex = persons.findIndex(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    // Person already exists in phonebook
    if (currentPersonIndex >= 0) {
      if (
        window.confirm(
          `${newPerson.name} already exists in the phonebook, replace old number with a new one?`
        )
      ) {
        phonebook
          .update(persons[currentPersonIndex].id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            notify(`${returnedPerson.name} updated`);
          })
          .catch((err) => {
            setPersons(
              persons.filter(
                (person) => person.id !== persons[currentPersonIndex].id
              )
            );
            notify(
              `${newPerson.name} has already been removed from the server`,
              "error"
            );
          });

        return;
      }
    }

    phonebook.create(newPerson).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      notify(`${returnedPerson.name} added`);
    });
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete entry for ${person.name}?`)) {
      phonebook
        .remove(person.id)
        .then(setPersons(persons.filter((p) => p.id !== person.id)));
    }
  };

  const handleFilter = (e) => setFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter onChange={handleFilter} />
      <PersonForm
        phoneChange={(e) => setNewName(e.target.value)}
        numberChange={(e) => setNewNumber(e.target.value)}
        onSubmit={addPhone}
        newName={newName}
        newNumber={newNumber}
      />
      <Notification notification={notification} />
      <Persons handleDelete={handleDelete} search={filter} persons={persons} />
    </div>
  );
};

export default App;
