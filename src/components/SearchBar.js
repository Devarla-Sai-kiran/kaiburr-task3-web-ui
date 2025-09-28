import React from 'react';
import './SearchBar.css';

function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="searchbar-input"
        placeholder="Search tasks by name..."
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search tasks"
      />
    </div>
  );
}

export default SearchBar;
