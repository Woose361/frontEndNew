import React, { useState } from 'react';

const SearchBar = ({ setMovies, setSearchQuery }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query); 
    setQuery(''); 
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
