
import RentalHouse from "./rentalHose.model";
import { IRentalHouse } from "./rentalHouse.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { RentalHouseSearchableFields } from "./rentalHouse.constant";
import { IImageFiles } from "../../interface/IImageFile";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import { IJwtPayload } from "../auth/auth.interface";
import User from "../user/user.model";
import { Request } from "express";
import RentalRequest from "../rentalRequest/rentalRequest.model";

const createRentalHouse = async(houseData:Partial<IRentalHouse>,houseImages: IImageFiles,authUser: IJwtPayload)=>{
    const { images } = houseImages;
    if (!images || images.length === 0) {
       throw new AppError(
          StatusCodes.BAD_REQUEST,
          'Product images are required.'
       );
    }
    houseData.images = images.map((image) => image.path);
    const createHouse = new RentalHouse({
        ...houseData,
        landlordUser:authUser.userId
    })
    const result = await createHouse.save();
    // houseData.images = images.map((image) => image.path);
    // const rentalHouse = await RentalHouse.create(houseData);
    // return rentalHouse;
    return result;
}

const getAllRentalHouse  = async(query: Record<string, unknown>)=>{
    // console.log(query);
    const {
        categories,
        bedrooms,
        minPrice,
        maxPrice,
        ...pQuery
     } = query;
 
     // Build the filter object
     const filter: Record<string, any> = {};
// console.log(categories);
   // Filter by categories
   if (categories) {
    const categoryArray = typeof categories === 'string'
       ? categories.split(',')
       : Array.isArray(categories)
          ? categories
          : [categories];
    filter.category = { $in: categoryArray };
 }
 if(bedrooms){
    filter.bedrooms = { $in: bedrooms };
 }

    const RentalHouseQuery = new QueryBuilder(RentalHouse.find(filter).populate('landlordUser').populate("category","_id name").setOptions({ strictPopulate: false }),  pQuery)
    .search(['name','location'])
    .filter()
    .sort()
    .paginate()
    .fields()
    .priceRange(Number(minPrice) || 0, Number(maxPrice) || Infinity)
    ;
    

 const result = await RentalHouseQuery.modelQuery.populate('User');
//  console.log(result);
 const meta = await RentalHouseQuery.countTotal();
 return {
    result,
    meta,
 };
};
const getAllHouseByUser  = async(req:Request)=>{
    const {query,user}=req
  
        let rentalHouses;
    
        // If the user is an admin, fetch all listings
        if (user.role === "admin") {
          rentalHouses = new QueryBuilder(RentalHouse.find().populate('landlordUser').populate("category","_id name").setOptions({ strictPopulate: false }), query)
          .search(RentalHouseSearchableFields)
          .filter()
          .sort()
          .paginate()
          .fields();
        }else if (user.role === "landlord") {
          rentalHouses = new QueryBuilder(RentalHouse.find({ landlordUser: user.userId }).populate('landlordUser').populate("category","_id name").setOptions({ strictPopulate: false }), query)
          .search(RentalHouseSearchableFields)
          .filter()
          .sort()
          .paginate()
          .fields();
        };
       
 const result = await rentalHouses?.modelQuery.populate('User');
 const meta = await rentalHouses?.countTotal();
 return {
    result,
    meta,
 };
};

const getRenTalHouseById = async(id:string)=>{
    const rentalHouse = await RentalHouse.findById(id);
    
    return rentalHouse;
} 
const updateRenTalHouseById = async(
    houseId: string,
    payload: Partial<IRentalHouse>,
    houseImages: IImageFiles,
    authUser: IJwtPayload
)=>{
    const { images } = houseImages;

    const user = await User.findById(authUser.userId);
   

    const house = await RentalHouse.findOne({_id:houseId, landlordUser:authUser.userId});
   

    if (!user?.isActive) {
       throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active');
    }
  
    if (!house) {
       throw new AppError(StatusCodes.NOT_FOUND, 'This Landlord House Not Found');
    }
 
    if (images && images.length > 0) {
       payload.images = images.map((image) => image.path);
    }

    return await RentalHouse.findByIdAndUpdate(houseId, payload, { new: true });
} 
const deleteRenTalHouseById = async(id:string)=>{
    const rentalHouse = await RentalHouse.findByIdAndDelete(id);
    await RentalRequest.deleteMany({ listingId:id });
    return rentalHouse;
} 
 

export const RentalHouseServices = {
    createRentalHouse,
    getAllRentalHouse,
    getRenTalHouseById,
    updateRenTalHouseById,
    deleteRenTalHouseById,
    getAllHouseByUser
}