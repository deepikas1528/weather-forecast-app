import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('Vancouver');
  const [searchedCity, setSearchedCity] = useState('Vancouver');
  const [unit, setUnit] = useState('metric');
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
      setError('API key is missing. Please add EXPO_PUBLIC_WEATHER_API_KEY to your .env file.');
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.badge}>Skyline Weather</Text>
          <Text style={styles.title}>Plan your day with better weather.</Text>
          <Text style={styles.subtitle}>
            Check live conditions, understand the forecast, and stay ready for every city you explore.
          </Text>
          <View style={styles.heroMetric}>
            <Text style={styles.heroMetricLabel}>Today</Text>
            <Text style={styles.heroMetricValue}>{todayLabel}</Text>
          </View>
        </View>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          loading={loading}
        />

        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
        {loading ? <Text style={styles.loadingMessage}>Fetching latest weather data...</Text> : null}

        <WeatherCard weather={weather} unit={unit} onToggleUnit={handleToggleUnit} />
        <ForecastCard forecast={forecast} unit={unit} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f8ff',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 14,
  },
  hero: {
    marginTop: 8,
    borderRadius: 18,
    padding: 18,
    backgroundColor: '#dff0ff',
    borderWidth: 1,
    borderColor: '#c4e4ff',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    color: '#0e375a',
    borderRadius: 999,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    color: '#08253f',
    fontWeight: '800',
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 14,
    color: '#2d4f6c',
    lineHeight: 21,
    marginTop: 8,
  },
  heroMetric: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#c1ddf5',
  },
  heroMetricLabel: {
    fontSize: 13,
    color: '#335d80',
  },
  heroMetricValue: {
    fontSize: 14,
    color: '#123b5d',
    fontWeight: '700',
  },
  errorMessage: {
    color: '#b3261e',
    fontSize: 13,
    backgroundColor: '#ffe3df',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f7b2a9',
    padding: 12,
  },
  loadingMessage: {
    color: '#244f74',
    fontSize: 13,
    backgroundColor: '#d9ebff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#b7d8ff',
    padding: 12,
  },
});

export default App;
