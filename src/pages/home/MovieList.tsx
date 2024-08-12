import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import { MovieSummaryDto } from '../../model/MovieDto';

interface MovieRecordProps {
  movie: MovieSummaryDto;
}

const MovieRecord = ({ movie }: MovieRecordProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
      <Card sx={{ minWidth: '120px' }}>
        <img
          src={movie.posterUrl}
          width={120}
          alt={`Poster`}
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Typography variant="subtitle1" gutterBottom>
            Average Rating: ({Math.floor(movie.rate.rate * 10) / 10} | {movie.rate.count} vote
            {movie.rate.count === 1 ? '' : 's'})
          </Typography>
          <Rating value={movie.rate.rate} readOnly precision={0.2} />
        </Box>
        <Typography variant="button" gutterBottom>
          <Link to={`/movies/${movie.id}`}>View Details</Link>
        </Typography>
      </Box>
    </Box>
  );
};

interface MovieListProps {
  movies: MovieSummaryDto[];
}
const MovieList = ({ movies }: MovieListProps) => {
  return (
    <Stack spacing={6}>
      {movies.map((movie) => {
        return <MovieRecord movie={movie} key={movie.id} />;
      })}
    </Stack>
  );
};

export default MovieList;
