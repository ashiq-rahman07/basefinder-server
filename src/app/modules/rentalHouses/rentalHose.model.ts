import mongoose, { Schema } from "mongoose";
import { IRentalHouse } from "./rentalHouse.interface";


mongoose.set('strictPopulate', false);
const rentalHoseSchema = new Schema<IRentalHouse>(
    {
        location: {
          type: String,
          required: true,
       },
       category:{
          type:Schema.Types.ObjectId,
          ref:'Category'
       },
       description: {
          type: String,
          required: true,
          lowercase: true,
       },
       rentAmount: {
          type: Number,
          required: true,
       },
       bedrooms: {
          type: Number,
          required: true,
       },
       images: {
          type: [String],
         required:true
       },
    
    
       landlordUser: {
          type:Schema.Types.ObjectId,
          ref:'User'
       },
       isAvailable: { type: Boolean, default: true },
     
    },
    {
     
       timestamps: true,
    },
   
 );
const RentalHouse = mongoose.model('RentalHouse',rentalHoseSchema);
export default RentalHouse;
