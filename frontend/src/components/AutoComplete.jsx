import { useState } from 'react';

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
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter a location"
        className="h-12 w-full rounded-xl border border-[#dce1dc] bg-[#fbfcfa] px-[15px] outline-none focus:border-[#e8664f] focus:ring-4 focus:ring-[#e8664f18]"
      />
      <div className="absolute z-10 mt-1 w-full rounded-xl border border-[#e3e8e2] bg-white p-1.5 shadow-[0_15px_30px_#17212b15]">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => handleSelect(suggestion)}
            className="cursor-pointer rounded-lg p-2.5 text-sm hover:bg-[#f3f5f1]"
          >
            {suggestion.display_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NominatimAutocomplete;
