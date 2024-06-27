import MyReservations from '../views/MyReservations';
import Reservation from '../views/Reservation';

const reservationRoutes = [
  {
    path: '/online-reservation',
    element: <Reservation />
  },
  {
    path: '/my-reservations',
    element: <MyReservations />
  },
];

export { reservationRoutes };