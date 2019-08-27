import React from 'react';
import './SearchBar.css';

const SearchBar = ({searchField, onInputChange, onSearchSubmit}) => {
  return(
    <div className='search_bar'>
      <input 
        className='input'
        onChange={onInputChange}
        type='search' 
        placeholder={'search recipes'}
      />
      <button className='search_btn' onClick={onSearchSubmit}>Search</button>
    </div>
  )
}

export default SearchBar;