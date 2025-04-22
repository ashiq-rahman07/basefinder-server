import mongoose, { Schema } from 'mongoose';
import { IRentalHouse } from './rentalHouse.interface';

mongoose.set('strictPopulate', false);
const rentalHoseSchema = new Schema<IRentalHouse>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
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
    bathrooms: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
    },
    images: {
      type: [String],
      required: true,
    },

    landlordUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const RentalHouse = mongoose.model('RentalHouse', rentalHoseSchema);
export default RentalHouse;
