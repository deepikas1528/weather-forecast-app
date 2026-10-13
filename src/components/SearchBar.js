function SearchBar({ city, setCity, onSearch, loading }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="search-card" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="city">Search Location</label>
        <p>Enter any city name to view current weather and forecast.</p>
      </div>

      <div className="search-row">
        <input
          id="city"
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Example: Vancouver"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
