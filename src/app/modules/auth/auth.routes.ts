import { Router } from 'express';
import { AuthController } from './auth.controller';
// import clientInfoParser from '../../middleware/clientInfoParser';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.interface';
// import validateRequest from '../../middleware/validateRequest';
// import { AuthValidation } from './auth.validation';

const router = Router();

router.post('/login', AuthController.loginUser);

router.post(
  '/refresh-token',
 
  AuthController.refreshToken
);

router.post(
  '/change-password',
  auth(UserRole.ADMIN, UserRole.Landlord, UserRole.Tenant),
  AuthController.changePassword
);


router.post('/reset-password', AuthController.resetPassword);

export const AuthRoutes = router;
