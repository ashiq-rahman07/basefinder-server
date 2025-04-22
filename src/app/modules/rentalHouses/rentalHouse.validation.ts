import { z } from 'zod';

const RentalHouseValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    location: z.string(),
    description: z.string(),
    rentAmount: z.number(),
    bedrooms: z.number(),
    bathrooms: z.number(),
    amenities: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
  }),
});

export const RentalHouseValidation = {
  RentalHouseValidationSchema,
};
