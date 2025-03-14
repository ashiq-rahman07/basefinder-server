import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/appError";
import RentalHouse from "../rentalHouses/rentalHose.model";
import { RentalRequestSearchableFields } from "./rentalRequest.constant";
import { IRentalRequest } from "./rentalRequest.interface";
import RentalRequest from "./rentalRequest.model";

const createRentalRequest = async(userId:string,payload:IRentalRequest)=>{
  
    const requestData = {
        ...payload,
        tenantId:userId,
    }
    const rentalHouse = await RentalRequest.create(requestData);
    return rentalHouse;
}

 const approveRequest = async(id:string,payload:string)=>{
    const request = await RentalRequest.findById(id);
    if (!request) {
      return new AppError(404,'Rental Request Not Found')
    }

    // Update the request status and add landlord's phone number
    // request.status ="approved";
    // request.landlordPhoneNumber = landlordPhoneNumber;
    await request.save();
 }

const getAllRentalRequest  = async(query:Record<string,unknown>)=>{
    const RentalRequestQuery = new QueryBuilder(RentalRequest.find(), query)
    .search(RentalRequestSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

 const result = await RentalRequestQuery.modelQuery.populate('User');
 const meta = await RentalRequestQuery.countTotal();
 return {
    result,
    meta,
 };
};
const getAllRentalRequestLandlord  = async(userId:string)=>{
    const listings = await RentalHouse.find({ landlordUser:userId }).select('_id');
    const listingIds = listings.map((listing) => listing._id);

    const result = await RentalRequest.find({ listingId: { $in: listingIds } }).populate(
        'tenantId',
        'name email phone'
      );

 return result;
};

const getRenTalRequestById = async(id:string)=>{
    const rentalRequest = await RentalRequest.findById(id);
    return rentalRequest;
} 
const updateRenTalRequestById = async(id:string,payload:Partial<IRentalRequest>)=>{
    const rentalRequest = await RentalRequest.findByIdAndUpdate(id,payload,{new:true})
    return rentalRequest;
} 
const deleteRenTalRequestById = async(id:string)=>{
    const rentalRequest = await RentalRequest.findByIdAndDelete(id);
    return rentalRequest;
} 
 

export const RentalRequestServices = {
    createRentalRequest,
    getAllRentalRequest,
    getRenTalRequestById,
    updateRenTalRequestById,
    deleteRenTalRequestById,
    approveRequest,
    getAllRentalRequestLandlord
}