import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useCallback, useState, ChangeEvent, KeyboardEvent } from 'react';

interface SearchBarProps {
  onSearch: (title: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [input, setInput] = useState<string>('');
  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(event.target.value);
  }, []);
  const onInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.key === 'Enter') {
        onSearch(input);
      }
    },
    [onSearch, input],
  );
  const onSearchBtnClicked = useCallback(() => onSearch(input), [onSearch, input]);

  return (
    <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search movies by title..."
        inputProps={{ 'aria-label': 'search movies' }}
        value={input}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onSearchBtnClicked}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
