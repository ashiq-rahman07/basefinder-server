import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/appError";
import { IImageFile } from "../../interface/IImageFile";
import { IJwtPayload } from "../auth/auth.interface";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";
import User from "../user/user.model";
import { UserRole } from "../user/user.interface";
import RentalHouse from "../rentalHouses/rentalHose.model";
import { Request } from "express";


const createCategory = async (
  categoryData: Partial<ICategory>,
  icon: IImageFile,
  authUser: IJwtPayload
) => {

  const category = new Category({
    ...categoryData,
    createdBy: authUser.userId,
    icon: icon?.path
  });

  const result = await category.save();

  return result;
};

const getAllCategory = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(
    Category.find(),
    query,
  )
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const categories = await categoryQuery.modelQuery;
  const meta = await categoryQuery.countTotal();

  const categoryMap = new Map<string, any>();
  const hierarchy: any[] = [];

  categories.forEach((category: any) => {
    categoryMap.set(category._id.toString(), { ...category.toObject(), children: [] });
  });

  categories.forEach((category: any) => {
    const parentId = category.parent?._id?.toString();
    if (parentId && categoryMap.has(parentId)) {
      categoryMap.get(parentId).children.push(categoryMap.get(category._id.toString()));
    } else if (!parentId) {
      hierarchy.push(categoryMap.get(category._id.toString()));
    }
  });

  return {
    meta,
    result: hierarchy,
  };
};
const getAllCategoryByUser  = async(req:Request)=>{
  const {query,user}=req

      let categories;
  
      // If the user is an admin, fetch all listings
      if (user.role === "admin") {
        categories = new QueryBuilder(Category.find().populate('createdBy',"_id name").setOptions({ strictPopulate: false }), query)
        .search(['name'])
        .filter()
        .sort()
        .paginate()
        .fields();
      }else if (user.role === "landlord") {
        categories = new QueryBuilder(Category.find({ createdBy: user.userId }).populate('createdBy',"_id name").setOptions({ strictPopulate: false }), query)
        .search(['name'])
        .filter()
        .sort()
        .paginate()
        .fields();
      };
      // If the user is a tenant, return an empty array or handle accordingly
  //    console.log('lend and admin :',rentalHouses)


  // const RentalHouseQuery = new QueryBuilder(RentalHouse.find().populate('landlordUser').populate("category","_id name").setOptions({ strictPopulate: false }), query)
  // .search(RentalHouseSearchableFields)
  // .filter()
  // .sort()
  // .paginate()
  // .fields();
// console.log(rentalHouses)
const result = await categories?.modelQuery.populate('User');
const meta = await categories?.countTotal();
return {
  result,
  meta,
};
};
const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<ICategory>,
  file: IImageFile,
  authUser: IJwtPayload
) => {
  const isCategoryExist = await Category.findById(id);
  if (!isCategoryExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "Category not found!")
  }

  if ((authUser.role === UserRole.Landlord) && (isCategoryExist.createdBy.toString() !== authUser.userId)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "You are not able to edit the category!")
  }

  if (file && file.path) {
    payload.icon = file.path
  }

  const result = await Category.findByIdAndUpdate(
    id,
    payload,
    { new: true }
  );

  return result;
};

const deleteCategoryIntoDB = async (
  id: string,
  authUser: IJwtPayload
) => {
  const isBrandExist = await Category.findById(id);
  if (!isBrandExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found!');
  }

  if (
    authUser.role === UserRole.Landlord &&
    isBrandExist.createdBy.toString() !== authUser.userId
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You are not able to delete the Category!'
    );
  }

  const product = await RentalHouse.findOne({ category: id })
  if (product) throw new AppError(StatusCodes.BAD_REQUEST, "You can not delete the Category. Because the Category is related to products.");

  const deletedCategory = await Category.findByIdAndDelete(id);
  return deletedCategory;
};


export const CategoryService = {
  createCategory,
  getAllCategory,
  updateCategoryIntoDB,
  deleteCategoryIntoDB,
  getAllCategoryByUser
}