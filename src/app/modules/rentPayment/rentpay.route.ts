import express from 'express';
import { RentPayController } from './rentpay.controller';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.interface';

const router = express.Router();

router.post(
  '/create-payment',
  auth(UserRole.Tenant),
  RentPayController.rentPayment
);
router.get(
  '/verify',
  auth(UserRole.Tenant, UserRole.ADMIN, UserRole.Landlord),
  RentPayController.verifyPayment
);
router.get(
  '/request/:id',
  auth(UserRole.Tenant, UserRole.ADMIN, UserRole.Landlord),
  RentPayController.getRentPayByReqId
);

router.get(
  '/:id',
  auth(UserRole.Tenant, UserRole.ADMIN, UserRole.Landlord),
  RentPayController.getRentPayById
);

//   '/verify',
//   auth('admin', 'customer'),
//   OrderControllers.verifyPayment,
// );
// router.get('/:userId', auth('customer'), OrderControllers.getUserOrders);
// router.get('/', auth('admin'), OrderControllers.getAllOrders);

// router.patch(
//   '/status/:orderId',
//   auth('admin'),
//   OrderControllers.updateOrderStatus,
// );
// router.delete('/:orderId', auth('admin'), OrderControllers.deleteUser);
// router.get('/revenue', OrderControllers.getTotalRevenue);

export const PaymentRouter = router;
