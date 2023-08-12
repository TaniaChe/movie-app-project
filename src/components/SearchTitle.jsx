import React from 'react';
import { InputGroup, Input, Button } from 'reactstrap';

export default function SearchTitle ({handleChange, value, handleSearch, showFavorite, renderFavorites}) {
  return (
    <InputGroup>
      <Input placeholder="Type movie name..." onChange={handleChange} value={value}/>
      <Button color="secondary" onClick={handleSearch}>Search</Button>
		  <Button color='info' onClick={showFavorite}>{renderFavorites ? 'Hide Favorites' : 'Show Favorites'}</Button>
    </InputGroup>

  );
}

