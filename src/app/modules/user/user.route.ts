import express from 'express';
import { UserControllers } from './user.controller';
// import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { UserRole } from './user.interface';
// import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.registerUserIntoDB,
);
router.get('/allusers', UserControllers.getAllUsers);
router.get('/:id', auth(UserRole.ADMIN,UserRole.Landlord,UserRole.Tenant), UserControllers.getSingleUsers);
// router.patch(
//   '/:id',
//   auth('admin', 'customer'),
//   validateRequest(UserValidation.userUpdateValidationSchema),
//   UserControllers.updateUser,
// );
// router.patch(
//   '/status/:userId',
//   auth('admin'),
//   validateRequest(UserValidation.userUpdateValidationSchema),
//   UserControllers.updateUserStatus,
// );
router.delete('/:id', auth(UserRole.ADMIN), UserControllers.deleteUser);
// router.get('/', auth(UserRole.ADMIN, UserRole.Landlord,UserRole.Tenant), UserControllers.getAllUsers);
router.get('/allusers', UserControllers.getAllUsers);
router.get('/my-profile', UserControllers.myProfile);
// router.patch(
//   '/update/:id',
//   validateRequest(UserValidation.userUpdateValidationSchema),
// );
export const UserRoutes = router;