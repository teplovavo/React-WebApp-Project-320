import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setBooks, setStatus }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      try {
        setStatus('loading');
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        if (response.data.items) {
          setBooks(response.data.items);
        } else {
          setBooks([]);
        }
        setStatus('succeeded');
      } catch (error) {
        console.error('Error fetching books:', error);
        setStatus('failed');
      }
      setQuery('');
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
