import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SearchBar from '../SearchBar';

describe('SearchBar component', () => {
  test('renders SearchBar component', () => {
    const onSearch = vi.fn();
    render(
      <MemoryRouter>
        <SearchBar onSearch={onSearch} />
      </MemoryRouter>,
    );
    expect(screen.getByPlaceholderText('Search movies by title...')).toBeInTheDocument();
    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton);
    expect(onSearch).toHaveBeenCalledOnce();
  });
});
