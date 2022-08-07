import Country from "./Country";

const Countries = ({ countries, handleToggle, toggleCountry }) => {
  let results;

  if (countries.length === 1) {
    results = <Country country={countries[0]} />;
  } else if (countries.length > 10) {
    results = "Too many matches, please try searching again";
  } else if (countries.length > 1) {
    results = countries.map((country) => (
      <li key={country.latlng}>
        {country.name.common}
        <button
          onClick={() => {
            handleToggle(country);
          }}
        >
          {toggleCountry === country ? "Hide" : "Show"}
        </button>
        {toggleCountry === country && <Country country={country} />}
      </li>
    ));
  } else if (countries.empty) {
    results = "Search by Country";
  }

  return <div>{results}</div>;
};
export default Countries;
