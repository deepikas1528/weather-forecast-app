import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function SearchBar({ city, setCity, onSearch, loading }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Search Location</Text>
      <Text style={styles.helperText}>Enter any city name to view current weather and forecast.</Text>

      <View style={styles.row}>
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Example: Vancouver"
          placeholderTextColor="#7790a5"
          autoCapitalize="words"
          returnKeyType="search"
          onSubmitEditing={onSearch}
          style={styles.input}
        />
        <Pressable
          onPress={onSearch}
          disabled={loading}
          style={({ pressed }) => [
            styles.button,
            loading ? styles.buttonDisabled : null,
            pressed ? styles.buttonPressed : null,
          ]}
        >
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Search'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d6e3f2',
  },
  label: {
    fontSize: 14,
    color: '#123a5c',
    fontWeight: '700',
  },
  helperText: {
    fontSize: 12,
    color: '#4e6a84',
    marginTop: 4,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c4d7eb',
    paddingHorizontal: 12,
    color: '#173d5f',
    backgroundColor: '#f8fbff',
  },
  button: {
    height: 46,
    borderRadius: 12,
    backgroundColor: '#0f5f9e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default SearchBar;
