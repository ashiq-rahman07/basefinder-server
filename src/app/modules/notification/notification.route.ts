import express from 'express';
import auth from '../../middleware/auth';

import { UserRole } from '../user/user.interface';
import { NotificationController } from './notification.controller';

const router = express.Router();

router.get(
  '/',

  auth(UserRole.Tenant, UserRole.Landlord, UserRole.ADMIN),
  NotificationController.getMyNotifications
);
router.patch(
  '/mark-all-as-read',

  auth(UserRole.Tenant, UserRole.Landlord, UserRole.ADMIN),
  NotificationController.updateNotification
);
router.delete(
  '/delete-all',

  auth(UserRole.Tenant, UserRole.Landlord, UserRole.ADMIN),
  NotificationController.deleteAllNotifications
);
router.patch(
  '/:id',

  auth(UserRole.Tenant, UserRole.Landlord, UserRole.ADMIN),
  NotificationController.markAsRead
);
router.delete(
  '/:id',
  auth(UserRole.Tenant, UserRole.Landlord, UserRole.ADMIN),
  NotificationController.deleteNotification
);

export const RentalNotification = router;
