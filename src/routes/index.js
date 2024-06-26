import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { homeRoutes } from './Home.routes';

export default function AppRouter() {
  const router = createBrowserRouter([
    ...homeRoutes
  ])
  return (<RouterProvider router={router} />);
};
