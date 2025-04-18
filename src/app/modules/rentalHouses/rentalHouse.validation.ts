import { ObjectId, isValidObjectId } from 'mongoose';
import { z } from "zod";

const RentalHouseValidationSchema = z.object({
    body:z.object({
        name: z.string(),
        location: z.string(),
        description: z.string(),
        rentAmount: z.number(),
        bedrooms: z.number(),
        bathrooms: z.number(),
        amenities:z.array(z.string()).optional(),
        images: z.array(z.string()).optional(),
     // Assuming landlordId is a string representing an ObjectId
    })
  });


  export const RentalHouseValidation = {
    RentalHouseValidationSchema,
  } 