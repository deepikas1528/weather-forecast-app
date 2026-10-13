function ForecastCard({ forecast, unit }) {
  if (!forecast.length) return null;

  const temperatureSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <section className="forecast-section fade-in">
      <div className="section-header">
        <p className="eyebrow">Next Days</p>
        <h2>Five-Day Forecast</h2>
      </div>

      <div className="forecast-grid">
        {forecast.map((item) => {
          const date = new Date(item.dt_txt);
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

          return (
            <article className="forecast-card" key={item.dt}>
              <p className="forecast-day">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <p className="forecast-date">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <img src={iconUrl} alt={item.weather[0].description} />
              <strong>{Math.round(item.main.temp)}{temperatureSymbol}</strong>
              <span>{item.weather[0].main}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ForecastCard;
