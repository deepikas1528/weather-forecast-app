# Skyline Weather Mobile

Skyline Weather Mobile is a React Native weather forecasting application built with Expo. It is a mobile adaptation of the original web weather project and provides city-based weather search, current conditions, and a five-day forecast in a mobile-friendly interface.

## Submission

- GitHub Repository: https://github.com/deepikas1528/weather-forecast-app

## Purpose

This project transforms the previous React web app into a native-style mobile experience for iOS and Android while preserving core weather functionality.

## Features

- Search weather by city name
- Display current weather with icon, temperature, humidity, wind speed, and pressure
- Five-day forecast cards
- Temperature unit toggle (Celsius/Fahrenheit)
- Loading and error states for API requests
- Mobile-optimized UI built with React Native components

## Tech Stack

- React Native
- Expo
- JavaScript
- OpenWeatherMap API

## Installation and Run

1. Install dependencies:

```bash
npm install
```

2. Create or update .env in the project root:

```env
EXPO_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key_here
```

3. Start Expo:

```bash
npm start
```

4. Run on device/emulator:

- Press i in terminal for iOS simulator (macOS)
- Press a for Android emulator
- Or scan the QR code in Expo Go

## Project Structure

```text
weather-forecast-app/
|- App.js
|- app.json
|- babel.config.js
|- index.js
|- src/
|  |- App.js
|  |- components/
|     |- ForecastCard.js
|     |- SearchBar.js
|     |- WeatherCard.js
|- .env.example
|- package.json
`- README.md
```

## Additional Notes

- The app uses EXPO_PUBLIC_WEATHER_API_KEY so the key can be read by the mobile bundle at runtime.
- If your API key is new, OpenWeather may take some time to activate it.
- The previous web deployment setup was removed as part of mobile migration.
- .env is ignored by git and should not be committed.
