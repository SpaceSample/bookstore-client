import { describe, test, expect, vi, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Home from '../index';

vi.mock('axios');

describe('Home page', () => {
  const mockAlert = vi.fn();
  vi.stubGlobal('alert', mockAlert);

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders Home page', async () => {
    (axios.get as Mock).mockResolvedValue({
      data: {
        movies: [
          {
            id: 1,
            title: 'Movie title',
            posterUrl: 'http://localhost/xxx.png',
            rate: {
              rate: 3.5,
              count: 2,
            },
          },
        ],
        page: 1,
        totalPages: 1,
      },
    });
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    const searchInput = screen.getByPlaceholderText('Search movies by title...');
    expect(searchInput).toBeInTheDocument();
    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeInTheDocument();
    fireEvent.keyDown(searchButton, { key: 'Enter', keyCode: 13 });
    expect(axios.get).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText('Movie title')).toBeInTheDocument();
    });
  });
});
