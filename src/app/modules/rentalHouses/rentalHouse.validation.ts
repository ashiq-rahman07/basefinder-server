import { ObjectId, isValidObjectId } from 'mongoose';
import { z } from "zod";

const RentalHouseValidationSchema = z.object({
    body:z.object({
        location: z.string(),
        description: z.string(),
        rentAmount: z.number(),
        bedrooms: z.number(),
        images: z.array(z.string()).optional(),
        landlordUser: z.string().refine((val) => isValidObjectId(val), {
        message: "Invalid ObjectId",
    }) // Assuming landlordId is a string representing an ObjectId
    })
  });


  export const RentalHouseValidation = {
    RentalHouseValidationSchema,
  } 