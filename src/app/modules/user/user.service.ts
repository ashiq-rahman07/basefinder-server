import { IUser, UserRole } from './user.interface';
import User from './user.model';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';

// import mongoose from 'mongoose';
// import { IImageFile } from '../../interface/IImageFile';
// import { AuthService } from '../auth/auth.service';

import { IJwtPayload } from '../auth/auth.interface';

// Function to register user
const registerUser = async (userData: IUser) => {
  

      if ([UserRole.ADMIN].includes(userData.role)) {
         throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Invalid role. Only User is allowed.');
      }

      // Check if the user already exists by email
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
         throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Email is already registered');
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
const getSingleUser = async (id:string) => {
   const user = User.findById(id)


  return user
};
const deleteUser = async (id:string) => {
   const user = User.findOneAndDelete({id})


  return user
};

const myProfile = async (authUser: IJwtPayload) => {
   const isUserExists = await User.findById(authUser.userId);
   if (!isUserExists) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
   }
   if (!isUserExists.isActive) {
      throw new AppError(StatusCodes.BAD_REQUEST, "User is not active!");
   }

   const profile = await User.findOne({ user: isUserExists._id });


   return {
      ...isUserExists.toObject(),
      profile: profile || null
   }

}

const updateProfile = async (
   payload: Partial<IUser>,
   userId: string
) => {
   const isUserExists = await User.findById(userId);

   if (!isUserExists) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
   }
   if (!isUserExists.isActive) {
      throw new AppError(StatusCodes.BAD_REQUEST, "User is not active!");
   }

   // if (file && file.path) {
   //    payload.photo = file.path;
   // }

   const result = await User.findOneAndUpdate(
      { _id: userId },
      payload,
      {
         new: true,
      }
   )

   return result;
};

// const updateUserStatus = async (userId: string) => {
//    const user = await User.findById(userId);

//    console.log('comes here');
//    if (!user) {
//       throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
//    }

//    user.isActive = !user.isActive;
//    const updatedUser = await user.save();
//    return updatedUser;
// };

export const UserServices = {
   registerUser,
   getAllUser,
   myProfile,
//    updateUserStatus,
updateProfile,
getSingleUser,
deleteUser

};