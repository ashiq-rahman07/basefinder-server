import mongoose, { Schema } from "mongoose";
// import { IRentalHouse } from "./rentalHouse.interface";
import { IRentalRequest } from "./rentalRequest.interface";


mongoose.set('strictPopulate', false);
const rentalRequestSchema = new Schema<IRentalRequest>(
    {
      listingId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref:'RentalHouse'
       },
       status: {
          type: String,
          enum:['Pending','Approved','Rejected'],
          required: true,
       },
       paymentStatus: {
          type: String,
          enum:["Pending","Paid","Failed"],
          default:"Pending"
       },
       tenantId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref:'User'
       },
       moveDate:{
         type: Date,
         required: true,
       },
       rentDuration:{
         type:String,
         required:true
       },
       message:{
         type:String,
         required:true
       },
       landlordPhone: { type: String },
     
    },
    {
     
       timestamps: true,
    },
   
 );
const RentalRequest = mongoose.model('RentalRequest',rentalRequestSchema);
export default RentalRequest;
