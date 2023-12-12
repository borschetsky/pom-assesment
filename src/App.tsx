import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { peopleSearch } from './api'
import useDebouncedCallback from './hooks/useDebounce';
import { PersonResponse } from './api/types';
import SearchBar from './components/SearchBar';
function App() {
  const [searchTerm, setSearchTerm ] = useState('');
  const [ result, setResult ] = useState<PersonResponse | undefined>(undefined);

  const handlePeopleSearch = async(term: string) => {
    const people = await peopleSearch(term);
    setResult(people);
  };

  const handleDebounce = useDebouncedCallback((value) => handlePeopleSearch(value), 200);

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    if (value === '') {
      setResult(undefined)
      return;
    }
    handleDebounce(value)
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={searchTerm} onChange={handleOnSearchChange} autoFocus/>
        <SearchBar />
       { result && result.results.map((res) => <p key={res.name}>{ res.name }</p>)}
      </header>
    </div>
  );
}

export default App;
