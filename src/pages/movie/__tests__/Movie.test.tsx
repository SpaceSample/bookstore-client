import { describe, test, expect, vi, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Movie from '../index';

vi.mock('axios');

describe('Movie Page', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders Movie Page', async () => {
    (axios.get as Mock).mockResolvedValue({
      data: {
        id: 1,
        title: 'Movie title',
        year: '2024',
        runtime: '123',
        genres: ['History'],
        director: 'director',
        actors: 'actors',
        plot: 'plot',
        posterUrl: 'http://localhost/xxx.png',
        rate: {
          rate: 3.5,
          count: 2,
        },
      },
    });

    render(
      <MemoryRouter initialEntries={['/movies/1']}>
        <Routes>
          <Route path="/movies/:id" element={<Movie />} />
        </Routes>
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Movie title')).toBeInTheDocument();
      expect(screen.getByAltText('Poster')).toBeInTheDocument();
    });
  });
});
