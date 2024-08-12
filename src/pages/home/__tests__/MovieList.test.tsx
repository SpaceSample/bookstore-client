import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import MovieList from '../MovieList';

describe('MovieList component', () => {
  test('renders MovieList component', () => {
    render(
      <MemoryRouter>
        <MovieList
          movies={[
            {
              id: 1,
              title: 'Movie title',
              posterUrl: 'http://localhost/xxx.png',
              rate: {
                rate: 3.5,
                count: 2,
              },
            },
          ]}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText('Movie title')).toBeInTheDocument();
    expect(screen.getByAltText('Poster')).toBeInTheDocument();
  });
});
