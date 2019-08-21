import React from 'react';

const SearchBar = ({searchField, onInputChange, onSearchSubmit}) => {
  return(
    <div>
      <input 
        onChange={onInputChange}
        type='text' 
        placeholder={'search recipes'}
      />
      <button onClick={onSearchSubmit}>Search</button>
    </div>
  )
}

export default SearchBar;