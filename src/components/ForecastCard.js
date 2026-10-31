import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function ForecastCard({ forecast, unit }) {
  if (!forecast.length) return null;

  const temperatureSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.eyebrow}>Next Days</Text>
        <Text style={styles.heading}>Five-Day Forecast</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {forecast.map((item) => {
          const date = new Date(item.dt_txt);
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

          return (
            <View style={styles.card} key={item.dt}>
              <Text style={styles.day}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</Text>
              <Text style={styles.date}>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
              <Image source={{ uri: iconUrl }} style={styles.icon} />
              <Text style={styles.temp}>{Math.round(item.main.temp)}{temperatureSymbol}</Text>
              <Text style={styles.condition}>{item.weather[0].main}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d5e4f2',
    backgroundColor: '#ffffff',
    padding: 14,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  eyebrow: {
    color: '#40617d',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  heading: {
    color: '#163d60',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  row: {
    gap: 10,
    paddingRight: 8,
  },
  card: {
    width: 110,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccdef0',
    backgroundColor: '#f7fbff',
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  day: {
    fontSize: 13,
    color: '#103456',
    fontWeight: '700',
  },
  date: {
    fontSize: 11,
    color: '#53718d',
    marginTop: 2,
  },
  icon: {
    width: 52,
    height: 52,
    marginTop: 4,
  },
  temp: {
    marginTop: 2,
    fontSize: 18,
    color: '#0f3c63',
    fontWeight: '800',
  },
  condition: {
    marginTop: 2,
    fontSize: 12,
    color: '#4a6884',
  },
});

export default ForecastCard;
