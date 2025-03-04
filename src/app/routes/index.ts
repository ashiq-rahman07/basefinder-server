import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { RentalHouseRoutes } from '../modules/rentalHouses/rentalHouse.route';
import { RentalRequestRoutes } from '../modules/rentalRequest/rentalRequest.router';

const router = Router();

const moduleRoutes = [
   {
      path: '/user',
      route: UserRoutes,
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

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
