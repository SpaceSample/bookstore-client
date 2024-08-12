import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import config from '../../config';
import SearchBar from './SearchBar';
import { MovieDto } from '../../model/MovieDto';
import MovieList from './MovieList';
import LoadingBox from '../../common/LoadingBox';

const Home = () => {
  const [queryStr, setQueryStr] = useState<string>();
  const [movies, setMovies] = useState<MovieDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const query = useCallback((title?: string, pageNum = 1) => {
    setLoading(true);
    axios
      .get('/movies', { baseURL: config.apiPath, params: { title, pageNum } })
      .then((res) => {
        setMovies(res.data.movies);
        setPage(res.data.page);
        setTotalPages(res.data.totalPages);
      })
      .catch((ex) => alert(ex))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onSearch = useCallback(
    (input?: string) => {
      setQueryStr(input);
      query(input);
    },
    [query],
  );

  const onPageChange = useCallback(
    (_e: any, pageNum: number) => {
      query(queryStr, pageNum);
    },
    [query, queryStr],
  );

  useEffect(() => query(), [query]);

  return (
    <>
      <Container maxWidth="md" sx={{ p: '32px 0' }}>
        <Stack spacing={4}>
          <Box sx={{ textAlign: 'center', color: '#b83f45' }}>
            <Typography variant="h1" gutterBottom>
              Bookstore Movies
            </Typography>
          </Box>
          <SearchBar onSearch={onSearch} />

          {loading ? (
            <LoadingBox />
          ) : (
            <>
              <Pagination count={totalPages} page={page} onChange={onPageChange} />
              <MovieList movies={movies} />
            </>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default Home;
