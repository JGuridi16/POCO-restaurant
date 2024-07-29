import MyReservations from '../views/MyReservations';
import Reservation from '../views/Reservation';
import PrivateRoute from './private.routes';

const reservationRoutes = [
  {
    path: '/online-reservation',
    element: <PrivateRoute>
      <Reservation />
    </PrivateRoute>,
  },
  {
    path: '/my-reservations',
    element: <PrivateRoute>
      <MyReservations />
    </PrivateRoute>,
  },
];

export { reservationRoutes };