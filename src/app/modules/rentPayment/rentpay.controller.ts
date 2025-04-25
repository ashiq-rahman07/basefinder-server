import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RentPayService } from './rentpay.service';

const rentPayment = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const rentPayment = await RentPayService.rentPayment(
    userId,
    req.body,
    req.ip!
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Rent Payment successfully',
    data: rentPayment,
  });
});

const getRentPayById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const result = await RentPayService.getRentPayById(userId, id);

  sendResponse(res, {
    success: true,
    message: 'PaymentInfo retrive successfully',
    statusCode: 201,
    data: result,
  });
});
const getRentPayByReqId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const result = await RentPayService.getRentPayById(userId, id);

  sendResponse(res, {
    success: true,
    message: 'PaymentInfo retrive successfully',
    statusCode: 201,
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { order_id } = req.query;
  const order = await RentPayService.verifyPayment(order_id as string, userId);

  sendResponse(res, {
    statusCode: 201,
    message: 'Order verified successfully',
    data: order,
    success: true,
  });
});
const getLandPayment = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const paymentData = await RentPayService.getLandPayment(userId);

  sendResponse(res, {
    statusCode: 201,
    message: 'Landlord payment data get successfully',
    data: paymentData,
    success: true,
  });
});

export const RentPayController = {
  rentPayment,
  getRentPayById,
  getRentPayByReqId,
  verifyPayment,
  getLandPayment,
};
