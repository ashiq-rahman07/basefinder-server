import mongoose, { Schema } from "mongoose";
import { IRentalHouse } from "./rentalHouse.interface";

const rentalHoseSchema = new Schema<IRentalHouse>(
    {
        location: {
          type: String,
          required: true,
       },
       description: {
          type: String,
          required: true,
          unique: true,
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
    
    
       landlordId: {
          type:mongoose.Schema.Types.ObjectId,
          ref:'User'
       },
     
    },
    {
       timestamps: true,
    }
 );
const RentalHouse = mongoose.model('RentalHouse',rentalHoseSchema);
export default RentalHouse;
