const Weather = ({ name, wind_speed, icon, temp }) => {
  return (
    <div>
      <h3>Weather in {name}</h3>
      <div>
        <p>Temperature: {temp}C</p>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
        <p>Wind: {wind_speed}m/s</p>
      </div>
    </div>
  );
};

export default Weather;
