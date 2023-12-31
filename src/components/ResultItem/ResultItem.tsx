import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { Person } from '../../api/types';
import { HistoryContext } from '../../context/HistorySearchContext';
import './ResultItem.scss';

type Props = {
  item: Person;
  onClick?: (item: Person) => void;
}
const ResultItem = ({ item, onClick }: Props) => {
  const context = useContext(HistoryContext);

  const handleItemClick = () => {
    onClick?.(item)
  };

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    context?.removeItem(item.name);
  };

  return (
    <div className="result-item-container" onClick={handleItemClick}>
      <div className="icon">
        { 
          context?.contains(item.name)
          ? <HistoryIcon />
          : <SearchIcon />
        }
      </div>
      <span className="result">{ item.name}</span>
      <div className="remove-icon" onClick={handleDelete}>
        { 
          context?.contains(item.name)
          && <DeleteOutlineIcon />
        }
      </div>
    </div>
  )
}

export default ResultItem;