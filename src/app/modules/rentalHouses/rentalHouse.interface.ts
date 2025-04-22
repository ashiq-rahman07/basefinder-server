import { ObjectId } from 'mongoose';

export interface IRentalHouse {
  name: string;
  location: string;
  category: ObjectId;
  description: string;
  rentAmount: number;
  bedrooms: number;
  bathrooms: number;
  amenities?: [string];
  images: Array<string>;
  landlordUser: ObjectId;
  isAvailable: boolean;
}
