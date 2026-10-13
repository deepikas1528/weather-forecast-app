# Skyline Weather

Skyline Weather is a polished, responsive weather dashboard built with React and the OpenWeatherMap API. It lets users search for any city and instantly view the current conditions, temperature, humidity, wind speed, and a five-day forecast.

## Links

- GitHub repository: https://github.com/deepikas1528/weather-forecast-app
- Published website: https://deepikas1528.github.io/weather-forecast-app/

## Features

- City search for live weather updates
- Current weather details including humidity, wind, pressure, and feels-like temperature
- Five-day forecast cards
- Unit toggle between Celsius and Fahrenheit
- Clear loading and error states
- Responsive design for desktop, tablet, and mobile
- Modern glassmorphism-inspired interface with custom branding

## Tech Stack

- React
- JavaScript
- HTML
- CSS
- OpenWeatherMap API

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root and add your API key:

```env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key_here
```

3. Start the app:

```bash
npm start
```

4. Visit:

```text
http://localhost:3000
```

> Keep your `.env` file private and do not upload it to GitHub.

## Deployment

This project is configured for GitHub Pages deployment.

```bash
npm install
npm run deploy
```

The production build is published to:

```text
https://deepikas1528.github.io/weather-forecast-app/
```

## Project Structure

```text
weather-forecast-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ForecastCard.js
│   │   ├── SearchBar.js
│   │   └── WeatherCard.js
│   ├── App.css
│   ├── App.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── package-lock.json
```

## GitHub Submission

Push this project to:

```bash
git add .
git commit -m "Prepare GitHub Pages deployment"
git branch -M main
git remote add origin https://github.com/deepikas1528/weather-forecast-app.git
git push -u origin main
```

## Notes

This project was customized to feel more personal and presentation-ready, with a cleaner hero section, branded messaging, and a more polished style that looks like a finished portfolio project rather than a raw template.

Additional evaluation notes:

- The app uses the OpenWeatherMap API and expects `REACT_APP_WEATHER_API_KEY` in the environment.
- Because this is a client-side React app, the API key used for any public deployment is embedded into the build output.
- The repository intentionally excludes `.env`, `node_modules`, and `build` artifacts.
