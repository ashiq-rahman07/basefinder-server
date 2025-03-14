// import httpStatus from 'http-status';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IJwtPayload } from '../auth/auth.interface';
import { UserServices } from './user.service';
// import { User } from './user.model';
// import { string } from 'zod';

const registerUserIntoDB = catchAsync(async (req, res) => {
  const result = await UserServices.registerUser(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: 201,
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUser(req.query);

  sendResponse(res, {
    success: true,
    message: 'User retrieve successfully',
    statusCode: 201,
    data: result,
  });
});
const getSingleUsers = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUser(id);

  sendResponse(res, {
    success: true,
    message: 'User retrieve successfully',
    statusCode: 201,
    data: result,
  });
});

const myProfile = catchAsync(async (req, res) => {
  const result = await UserServices.myProfile(req.user as IJwtPayload);

  sendResponse(res, {
     statusCode: StatusCodes.OK,
     success: true,
     message: 'Profile retrieved successfully',
     data: result,
  });
});

// const updateUser = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await UserServices.updateUser(id, req.body);

//   sendResponse(res, {
//     success: true,
//     message: 'User update successfully',
//     statusCode: 201,
//     data: result,
//   });
// });
// const updateUserStatus = catchAsync(async (req, res) => {
//   const { userId } = req.params;
//   console.log(userId, req.body);
//   const result = await UserServices.updateUserStatus(userId, req.body);

//   sendResponse(res, {
//     success: true,
//     message: 'User update successfully',
//     statusCode: 201,
//     data: result,
//   });
// });
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUser(id);

  sendResponse(res, {
    success: true,
    message: 'User delete successfully',
    statusCode: 201,
    data: result,
  });
});

export const UserControllers = {
  registerUserIntoDB,
  getAllUsers,
  myProfile,
//   updateUser,
  deleteUser,
  getSingleUsers,
//   updateUserStatus,
};