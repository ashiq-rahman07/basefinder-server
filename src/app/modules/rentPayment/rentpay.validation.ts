import { z } from 'zod';

const paymentValidationSchema = z.object({
  listing: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ObjectId'), // Validates a MongoDB ObjectId

  rentAmount: z.number().min(0), // Total price must be non-negative
});

export default paymentValidationSchema;
