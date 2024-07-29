import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '../views/Login';
import { homeRoutes } from './home.routes';
import { reservationRoutes } from './reservation.routes';
import { AppProvider } from '../store';
import { AuthContext, AuthProvider } from '../store/auth';
import PrivateRoute from './private.routes';

export default function AppRouter() {
  const routes = [
    {
      path: '/login',
      element: (<Login />),
    },
    {
      path: '/',
      element: <PrivateRoute>
        <Layout />
        <Outlet />
      </PrivateRoute>,
      children: [
        ...homeRoutes,
        ...reservationRoutes
      ],
    }
  ];

  const router = createBrowserRouter(routes);
  return (
    <AuthProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </AuthProvider>
  );
};
