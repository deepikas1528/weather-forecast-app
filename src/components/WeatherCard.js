function WeatherCard({ weather, unit, onToggleUnit }) {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  const temperatureSymbol = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <section className="weather-card fade-in">
      <div className="weather-main">
        <div>
          <p className="eyebrow">Current Weather</p>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="condition">{weather.weather[0].description}</p>
        </div>
        <img src={iconUrl} alt={weather.weather[0].description} />
      </div>

      <div className="temperature-row">
        <h3>{Math.round(weather.main.temp)}{temperatureSymbol}</h3>
        <button className="unit-button" onClick={onToggleUnit}>
          Show in {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
        </button>
      </div>

      <div className="details-grid">
        <div>
          <span>Feels Like</span>
          <strong>{Math.round(weather.main.feels_like)}{temperatureSymbol}</strong>
        </div>
        <div>
          <span>Humidity</span>
          <strong>{weather.main.humidity}%</strong>
        </div>
        <div>
          <span>Wind Speed</span>
          <strong>{weather.wind.speed} {windUnit}</strong>
        </div>
        <div>
          <span>Pressure</span>
          <strong>{weather.main.pressure} hPa</strong>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;
