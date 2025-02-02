import React, { useState } from 'react';

const NominatimAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query) => {
    if (query.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
        );
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.display_name);
    onSelect(suggestion.display_name);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter a location"
        className="border-2 border-gray-200 w-[900px] h-[38px] rounded-l p-2"
      />
      <div>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => handleSelect(suggestion)}
            style={{ padding: '5px', cursor: 'pointer' }}
          >
            {suggestion.display_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NominatimAutocomplete;
