import { string } from "zod";
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
const getAllRentReqTenant  = async(tenantId:string,query:Record<string,unknown>)=>{
    
    const RentalRequestQuery = new QueryBuilder(RentalRequest.find({tenantId}), query)
    .search(RentalRequestSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

 const result = await RentalRequestQuery.modelQuery.populate('listingId','name location rentAmount' )

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
        'listingId',
        'location name rentAmount'
      ).populate(
        'tenantId',
        'name email'
      );

 return result;
};

const getRequestListingTent  = async(tenantId:string,listingId:string)=>{
    
    const rentRequest = await RentalRequest.findOne({ tenantId,listingId})
   

  

 return rentRequest;
};





const getRenTalRequestById = async(id:string)=>{
    const rentalRequest = await RentalRequest.findById(id);
    return rentalRequest;
} 
const updateRequestStatus = async(id:string,payload:{ status: string; landlordPhone?: string })=>{
    const { status, landlordPhone } = payload;
    const request = await RentalRequest.findById(id);
    if (!request) {
      return new AppError(404,'Rental Request Not Found')
    }

    try {
        const updateData: { status: string; landlordPhone?: string } = { status };
    
        // Add landlordPhone only if status is "Approved"
        if (status === 'Approved' && landlordPhone) {
          updateData.landlordPhone = landlordPhone;
        }
    
        const updatedRequest = await RentalRequest.findByIdAndUpdate(
          id,
          updateData,
          { new: true } // Return the updated document
        );
    
        if (!updatedRequest) {
            throw new AppError(404,'Request not found');
        //   return res.status(404).json({ success: false, message: 'Request not found' });
        }
    
        // res.status(200).json({ success: true, data: updatedRequest });
         const result = {
            success: true, 
            data: updatedRequest
        }
        return result;
      } catch (error) {
        console.error('Error updating request status:', error);
        // res.status(500).json({ success: false, message: 'Failed to update request status' });
      }
    
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
    updateRequestStatus,
    getAllRentalRequestLandlord,
    getRequestListingTent,
    getAllRentReqTenant
}