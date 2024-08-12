import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';

import { MovieDto } from '../../model/MovieDto';
import config from '../../config';
import LoadingBox from '../../common/LoadingBox';

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDto>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/movies/${id}`, { baseURL: config.apiPath })
      .then((res) => {
        setMovie(res.data);
      })
      .catch((ex) => alert(ex))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  const sendRating = useCallback(
    (_event: unknown, value: number | null) => {
      if (!movie || !value) {
        return;
      }
      axios
        .put(`/movies/${id}/rate`, { rate: value }, { baseURL: config.apiPath })
        .then((res) => {
          const rate = res.data;
          setMovie({ ...movie, rate });
        })
        .catch((ex) => alert(ex))
        .finally(() => {
          setLoading(false);
        });
    },
    [id, movie],
  );

  if (loading) {
    return <LoadingBox />;
  }
  return movie ? (
    <div>
      <Box sx={{ p: '32px' }}>
        <Link to="/">{'< Go Back'}</Link>
      </Box>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '32px' }}>
          <Card sx={{ width: '300px', flex: 'none' }}>
            <img
              src={movie.posterUrl}
              alt={`Poster`}
              width={300}
              height={450}
              onError={(e) => {
                if (e.target instanceof HTMLImageElement) {
                  e.target.src = '/vite.svg';
                }
              }}
            />
          </Card>
          <Box sx={{ flex: 'auto' }}>
            <Typography variant="h5" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Genre: {movie.genres.join(', ')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Release Date : {movie.year}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              director: {movie.director}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Actors: {movie.actors}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Typography variant="subtitle1" gutterBottom>
                Average Rating: ({Math.floor(movie.rate.rate * 10) / 10} | {movie.rate.count} vote
                {movie.rate.count === 1 ? '' : 's'})
              </Typography>
              <Rating value={movie.rate.rate} readOnly precision={0.2} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Typography variant="subtitle1" gutterBottom>
                Rate:
              </Typography>
              <Rating onChange={sendRating} />
            </Box>
            <Typography variant="body1" gutterBottom>
              Plot: {movie.plot}
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  ) : (
    <></>
  );
};

export default Movie;
