import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import { homeRoutes } from './home.routes';
import { reservationRoutes } from './reservation.routes';
import { AppProvider } from '../store';

export default function AppRouter() {
  const routes = [
    {
      path: '/',
      element: (<>
        <Layout />
        <Outlet />
      </>),
      children: [
        ...homeRoutes,
        ...reservationRoutes
      ],
    }
  ];

  const router = createBrowserRouter(routes)
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};
