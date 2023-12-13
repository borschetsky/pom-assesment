import CloseIcon from '@mui/icons-material/Close';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { useContext, useEffect, useRef, useState } from 'react';
import { peopleSearch } from '../api';
import { Person, PersonResponse } from '../api/types';
import { HistoryContext } from '../context/HistorySearchContext';
import useDebouncedCallback from '../hooks/useDebounce';
import ResultItem from './ResultItem/ResultItem';
import './SearchBar.scss';

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBar = ({ onChange }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm ] = useState('');
  const [ result, setResult ] = useState<PersonResponse | undefined>(undefined);
  const [isVisible, setIsVisible ] = useState(false);
  const [isLoading, setIsLoading ] = useState(false);
  const context = useContext(HistoryContext);

  const handleClickOutside = (e: any) => {
    if(ref &&  ref.current && !ref.current.contains(e.target)){
      setIsVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  },[])
  
  const handlePeopleSearch = async(term: string) => {
    setIsLoading(true)
    const people = await peopleSearch(term);
    setResult(people);
    setIsLoading(false)
  };

  const handleDebounce = useDebouncedCallback((value) => handlePeopleSearch(value), 200);

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    setIsVisible(true);
    if (value === '') {
      setResult(undefined)
      return;
    } else {
      handleDebounce(value)
    }
  };
  
  const handleClearSearch = (e: React.MouseEvent<HTMLDivElement>) => {
    setSearchTerm('');
  };

  const handleItemClick = (person: Person) => {
    setSearchTerm(person.name);
    if(!Object(context?.history).hasOwnProperty(person.name)) {
      context?.setSearchHistory(person.name, person);
      setResult(undefined)
    } else {
      handleDebounce(person.name)
    }
  }
  const handleSearchClick = () => {
    setIsVisible((prev) => !prev)
  };

  const results = result
    ? result.results
    : context?.history && Object.entries(context?.history).map(([key, value]) => value);

  return (
    <div className="searchbox" onClick={handleSearchClick} ref={ref}>
      <div className="input-wrapper">
        <input 
          className="search-input"
          aria-label="Search for a place on the map" 
          placeholder="Enter place name or address"
          type="text"
          onChange={handleOnSearchChange}
          value={searchTerm}
          autoFocus
        />
        <div className="end-anchor" onClick={handleClearSearch}>
          {(searchTerm && !isLoading) && <CloseIcon />}
          {isLoading && <HourglassTopIcon />}
        </div>
      </div>
      {(isVisible && results) && <div className="dropdown-container">
        { results && results.map((person) => <ResultItem key={person.url} item={person} onClick={handleItemClick}/>)}
      </div>}
</div>

  );
};

export default SearchBar