import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingBox = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%', height: '200px', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress size={80} />
    </Box>
  );
};

export default LoadingBox;
