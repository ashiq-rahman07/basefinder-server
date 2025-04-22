import { IUser, UserRole } from './user.interface';
import User from './user.model';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';

import { IJwtPayload } from '../auth/auth.interface';
import RentalHouse from '../rentalHouses/rentalHose.model';
import RentalRequest from '../rentalRequest/rentalRequest.model';

const registerUser = async (userData: IUser) => {
  if ([UserRole.ADMIN].includes(userData.role)) {
    throw new AppError(
      StatusCodes.NOT_ACCEPTABLE,
      'Invalid role. Only User is allowed.'
    );
  }

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError(
      StatusCodes.NOT_ACCEPTABLE,
      'Email is already registered'
    );
  }

  const newUser = User.create(userData);
  return newUser;
};

const getAllUser = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await UserQuery.modelQuery;
  const meta = await UserQuery.countTotal();
  return {
    result,
    meta,
  };
};
const getSingleUser = async (id: string) => {
  const user = User.findById(id);

  return user;
};

// const deleteUser = async (id:string) => {
//    const user = User.findOneAndDelete({id})

//   return user
// };

const myProfile = async (authUser: IJwtPayload) => {
  const result = await User.findById(authUser.userId).select('-password');
  // if (!isUserExists) {
  //    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  // }
  // if (!isUserExists.isActive) {
  //    throw new AppError(StatusCodes.BAD_REQUEST, "User is not active!");
  // }

  // const profile = await User.findOne({ user: isUserExists._id }).select('password');

  return result;
};

const updateProfile = async (payload: Partial<IUser>, userId: string) => {
  const isUserExists = await User.findById(userId);

  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }
  if (!isUserExists.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active!');
  }

  // if (file && file.path) {
  //    payload.photo = file.path;
  // }

  const result = await User.findOneAndUpdate({ _id: userId }, payload, {
    new: true,
  });

  return result;
};

const updateUserStatus = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
  }

  user.isActive = !user.isActive;
  const updatedUser = await user.save();
  return updatedUser;
};

const deleteUser = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (user?.role == 'tenant') {
      await User.findByIdAndDelete(id);
      return {
        message:
          'user delete also request listing and request delete create by user',
      };
    }

    //  Delete all listings created by the user
    const listings = await RentalHouse.find({ landlordUser: id });

    for (const listing of listings) {
      // Delete all requests associated with each listing
      await RentalRequest.deleteMany({ listingId: listing._id });
    }

    // Delete listings
    await RentalHouse.deleteMany({ landlordUser: id });

    // Delete user
    await User.findByIdAndDelete(id);

    return {
      message:
        'user delete also reted listing and request delete create by user',
    };
  } catch (error: any) {
    return { message: error.message };
  }
};
export const UserServices = {
  registerUser,
  getAllUser,
  myProfile,
  updateUserStatus,
  updateProfile,
  getSingleUser,
  deleteUser,
};
