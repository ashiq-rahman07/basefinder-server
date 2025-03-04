import mongoose, { Schema } from "mongoose";
// import { IRentalHouse } from "./rentalHouse.interface";
import { IRentalRequest, RentalRequestStatus } from "./rentalRequest.interface";


mongoose.set('strictPopulate', false);
const rentalRequestSchema = new Schema<IRentalRequest>(
    {
        houseId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref:'RentalHouse'
       },
       status: {
          type: String,
          required: true,
          enum:[RentalRequestStatus.PENDING,RentalRequestStatus.ACCEPTED,RentalRequestStatus.REJECTED],
          default:RentalRequestStatus.PENDING
       },
       paymentStatus: {
          type: String,
          required: true,
          enum:["pending","paid","failed"],
          default:"pending"
       },
       tenantUser: {
          type: Schema.Types.ObjectId,
          required: true,
          ref:'User'
       },
       message:{
         type:String,
         required:true
       }
     
    },
    {
     
       timestamps: true,
    },
   
 );
const RentalRequest = mongoose.model('RentalRequest',rentalRequestSchema);
export default RentalRequest;
