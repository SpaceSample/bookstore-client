import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Movie from './pages/movie';
import NotFund from './pages/404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/404',
    element: <NotFund />,
  },
  {
    path: '/movies/:id',
    element: <Movie />,
  },
]);

export default router;
