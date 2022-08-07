import Weather from "./Weather";
import axios from "axios";
import { useState, useEffect } from "react";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`
      )
      .then((resp) => {
        setWeather(resp.data);
      })
      .catch((err) => console.log(err));
  }, [country]);

  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages </h3>
      <ul>
        {Object.entries(country.languages).map((lang) => (
          <li key={lang[0]}>{lang[1]}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      {weather ? (
        <Weather
          name={country.name.common}
          temp={weather.main.temp}
          wind_speed={weather.wind.speed}
          icon={weather.weather[0].icon}
        />
      ) : (
        <div>Loading...</div>
      )}
      <br />
    </div>
  );
};

export default Country;
