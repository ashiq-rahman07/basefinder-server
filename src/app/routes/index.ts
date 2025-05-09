import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { RentalHouseRoutes } from '../modules/rentalHouses/rentalHouse.route';
import { RentalRequestRoutes } from '../modules/rentalRequest/rentalRequest.router';
import { CategoryRoutes } from '../modules/category/category.routes';
import { PaymentRouter } from '../modules/rentPayment/rentpay.route';
import { RentalNotification } from '../modules/notification/notification.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/notification',
    route: RentalNotification,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/rental-house',
    route: RentalHouseRoutes,
  },
  {
    path: '/rental-request',
    route: RentalRequestRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/rent-pay',
    route: PaymentRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
