import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('Vancouver');
  const [searchedCity, setSearchedCity] = useState('Vancouver');
  const [unit, setUnit] = useState('metric');
  const [theme, setTheme] = useState('light');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getDailyForecast = (forecastList) => {
    const dailyData = [];
    const selectedDates = new Set();

    forecastList.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      const time = item.dt_txt.split(' ')[1];

      if (!selectedDates.has(date) && time === '12:00:00') {
        selectedDates.add(date);
        dailyData.push(item);
      }
    });

    return dailyData.slice(0, 5);
  };

  const getApiErrorMessage = async (response, fallbackMessage) => {
    if (response.status === 401) {
      return 'OpenWeather rejected your API key (401). Verify the key, and if it is newly created, wait up to 1-2 hours for activation, then restart npm start.';
    }

    if (response.status === 429) {
      return 'Too many requests. Please wait a moment and try again.';
    }

    try {
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (typeof data?.message === 'string' && data.message.trim()) {
          return data.message;
        }
      } else {
        const text = await response.text();
        if (text.trim()) {
          return text.trim();
        }
      }
    } catch {
      // Ignore parse errors and use a fallback message below.
    }

    return fallbackMessage;
  };

  const fetchWeather = async (location = searchedCity, selectedUnit = unit) => {
    const trimmedApiKey = API_KEY ? API_KEY.trim() : '';

    if (!trimmedApiKey) {
      setError('API key is missing. Please add REACT_APP_WEATHER_API_KEY to your .env file.');
      return;
    }

    if (trimmedApiKey.includes('your_openweathermap_api_key')) {
      setError('Please replace the placeholder API key in .env with your real OpenWeather key.');
      return;
    }

    const normalizedLocation = location.trim();

    if (!normalizedLocation) {
      setError('Please enter a city name.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(normalizedLocation)}&limit=1&appid=${trimmedApiKey}`;
      const geocodeResponse = await fetch(geocodeUrl);

      if (!geocodeResponse.ok) {
        const apiError = await getApiErrorMessage(
          geocodeResponse,
          'Unable to search location right now. Please try again.'
        );
        throw new Error(apiError);
      }

      const geocodeData = await geocodeResponse.json();

      if (!geocodeData.length) {
        throw new Error('City not found. Try adding a country code like "Paris, FR".');
      }

      const { lat, lon, name, country } = geocodeData[0];
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${selectedUnit}&appid=${trimmedApiKey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${selectedUnit}&appid=${trimmedApiKey}`;

      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl),
      ]);

      if (!weatherResponse.ok) {
        const apiError = await getApiErrorMessage(
          weatherResponse,
          'Unable to fetch current weather.'
        );
        throw new Error(apiError);
      }

      if (!forecastResponse.ok) {
        const apiError = await getApiErrorMessage(
          forecastResponse,
          'Unable to fetch forecast data.'
        );
        throw new Error(apiError);
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();
      const cityLabel = `${name}${country ? `, ${country}` : ''}`;

      setWeather(weatherData);
      setForecast(getDailyForecast(forecastData.list));
      setSearchedCity(cityLabel);
      setCity(cityLabel);
    } catch (err) {
      setWeather(null);
      setForecast([]);
      setError(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeather(city, unit);
  };

  const handleToggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    fetchWeather(searchedCity, newUnit);
  };

  useEffect(() => {
    fetchWeather('Vancouver', unit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <main className={`app ${theme}`}>
      <section className="hero">
        <div className="hero-background" aria-hidden="true">
          <span>Clear Skies</span>
          <span>Sunrise Plans</span>
          <span>Rain Watch</span>
        </div>

        <div className="hero-content">
          <div className="hero-topline">
            <p className="app-badge">☁️ Skyline Weather</p>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? 'Dark mode' : 'Light mode'}
            </button>
          </div>

          <h1>Plan your day with better weather.</h1>
          <p>
            Check live conditions, understand the forecast, and stay ready for
            every city you explore — from crisp mornings to stormy evenings.
          </p>

          <div className="hero-metrics" aria-label="Weather summary info">
            <span>Today</span>
            <strong>{todayLabel}</strong>
          </div>
        </div>
      </section>

      <section className="dashboard">
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          loading={loading}
        />

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Fetching latest weather data...</div>}

        <WeatherCard weather={weather} unit={unit} onToggleUnit={handleToggleUnit} />
        <ForecastCard forecast={forecast} unit={unit} />
      </section>
    </main>
  );
}

export default App;
