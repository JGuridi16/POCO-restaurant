import Home from '../views/Home';
import PrivateRoute from './private.routes';

const homeRoutes = [
  {
    index: true,
    path: '/home',
    element: <PrivateRoute>
      <Home />
    </PrivateRoute>,
  },
];

export { homeRoutes };