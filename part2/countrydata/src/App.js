import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Search from "./components/Search";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [toggleCountry, setToggleCountry] = useState({});

  const filteredCountries =
    search.length === 0
      ? { empty: true }
      : countries.filter(
          (country) => country.name.common.toLowerCase().indexOf(search) >= 0
        );

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((resp) => setCountries(resp.data));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleToggle = (country) => {
    if (toggleCountry === country) {
      setToggleCountry({});
    } else {
      setToggleCountry(country);
    }
  };

  return (
    <div>
      <Search onChange={handleSearch} search={search} />
      <Countries
        handleToggle={handleToggle}
        countries={filteredCountries}
        toggleCountry={toggleCountry}
      />
    </div>
  );
}

export default App;
