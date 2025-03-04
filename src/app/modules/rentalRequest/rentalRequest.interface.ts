import { ObjectId } from "mongoose";


export enum RentalRequestStatus{
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected'
}
export interface IRentalRequest{
    houseId:ObjectId
    status:RentalRequestStatus;
    paymentStatus:"pending"|"paid"|"failed"; 
    tenantUser:ObjectId,
    message:string
}