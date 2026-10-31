import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function WeatherCard({ weather, unit, onToggleUnit }) {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  const temperatureSymbol = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <View style={styles.card}>
      <View style={styles.mainRow}>
        <View style={styles.textColumn}>
          <Text style={styles.eyebrow}>Current Weather</Text>
          <Text style={styles.city}>{weather.name}, {weather.sys.country}</Text>
          <Text style={styles.condition}>{weather.weather[0].description}</Text>
        </View>
        <Image source={{ uri: iconUrl }} style={styles.icon} />
      </View>

      <View style={styles.temperatureRow}>
        <Text style={styles.temperature}>{Math.round(weather.main.temp)}{temperatureSymbol}</Text>
        <Pressable onPress={onToggleUnit} style={({ pressed }) => [styles.unitButton, pressed ? styles.pressed : null]}>
          <Text style={styles.unitButtonText}>
            Show in {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Feels Like</Text>
          <Text style={styles.detailValue}>{Math.round(weather.main.feels_like)}{temperatureSymbol}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind Speed</Text>
          <Text style={styles.detailValue}>{weather.wind.speed} {windUnit}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Pressure</Text>
          <Text style={styles.detailValue}>{weather.main.pressure} hPa</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: '#0f3f68',
    borderWidth: 1,
    borderColor: '#2a5f8e',
    padding: 15,
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textColumn: {
    flex: 1,
    paddingRight: 8,
  },
  eyebrow: {
    fontSize: 12,
    color: '#bdd9f2',
    fontWeight: '700',
    marginBottom: 5,
  },
  city: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: '800',
    lineHeight: 28,
  },
  condition: {
    marginTop: 4,
    color: '#cde3f5',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  icon: {
    width: 84,
    height: 84,
  },
  temperatureRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperature: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '800',
  },
  unitButton: {
    backgroundColor: '#2b6ea4',
    borderWidth: 1,
    borderColor: '#578fbc',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  unitButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  detailsGrid: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  detailItem: {
    width: '47%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2e628f',
    backgroundColor: '#134875',
    padding: 10,
  },
  detailLabel: {
    color: '#bed9f1',
    fontSize: 11,
  },
  detailValue: {
    marginTop: 4,
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default WeatherCard;
