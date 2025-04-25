import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Notification } from './notification.model';
import { NotificationServices } from './notification.service';

// const createRentalRequest = catchAsync(async (req, res) => {
//   const { userId } = req.user;

//   const result = await NotificationServices.createNotification(
//     userId,
//     req.body
//   );

//   sendResponse(res, {
//     success: true,
//     message: 'Rental Request created successfully',
//     statusCode: 201,
//     data: result,
//   });
// });

const markAsRead = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NotificationServices.markAsRead(id);

  sendResponse(res, {
    success: true,
    message: 'Rental Request retrive successfully',
    statusCode: 201,
    data: result,
  });
});
const getMyNotifications = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const role = req.user.role;
  const result = await NotificationServices.getMyNotifications(userId, role);

  sendResponse(res, {
    success: true,
    message: 'Notification  retrieve successfully',
    statusCode: 201,
    data: result,
  });
});
const updateNotification = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  // const role = req.user.role;
  const result = await NotificationServices.updateNotification(userId);

  sendResponse(res, {
    success: true,
    message: 'Notification Updated successfully',
    statusCode: 201,
    data: result,
  });
});
export const deleteNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const result = await NotificationServices.deleteNotification(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Notification deleted successfully',
    data: result,
  });
});

export const deleteAllNotifications = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  await Notification.deleteMany({ recipientId: userId });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'All notifications deleted successfully',
    data: null,
  });
});
export const NotificationController = {
  getMyNotifications,
  //   createRentalRequest,
  markAsRead,
  updateNotification,
  deleteNotification,
  deleteAllNotifications,
};
