import AppError from '../../errors/appError';
import { Notification } from './notification.model';

export const createNotification = async ({
  recipient,
  role,
  message,
}: {
  recipient: string;
  role: 'tenant' | 'landlord' | 'admin';
  message: string;
}) => {
  const notification = await Notification.create({ recipient, role, message });
  return notification;
};

export const getMyNotifications = async (userId: string, role: string) => {
  // const userId = req.user.userId; // assuming from auth middleware
  // const role = req.user.role;

  if (role === 'admin') {
    // Admin sees all admin notifications
    const notifications = await Notification.find({ role: 'admin' }).sort({
      createdAt: -1,
    });

    return notifications;
  } else {
    // Tenant or Landlord sees only their own
    const notifications = await Notification.find({
      recipientId: userId,
      role: role,
    }).sort({ createdAt: -1 });

    return notifications;
  }
};
export const updateNotification = async (userId: string) => {
  // const userId = req.user.userId; // assuming from auth middleware
  // Assuming the userId is part of the authenticated user

  // Update all notifications related to the user to 'read'
  const updatedNotifications = await Notification.updateMany(
    { recipientId: userId, isRead: false }, // Only target unread notifications
    { $set: { isRead: true } } // Mark as read
  );

  if (updatedNotifications.modifiedCount === 0) {
    return { success: false, message: 'No notifications to mark as read.' };
  }

  return updatedNotifications;
};

const deleteNotification = async (notificationId: string, userId: string) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    recipientId: userId,
  });

  if (!notification) {
    throw new AppError(404, 'Notification not found or not authorized');
  }

  await Notification.findByIdAndDelete(notificationId);
  return { deletedId: notificationId };
};
export const markAsRead = async (id: string) => {
  return await Notification.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  );
};

export const NotificationServices = {
  createNotification,
  updateNotification,
  getMyNotifications,
  markAsRead,
  deleteNotification,
};
