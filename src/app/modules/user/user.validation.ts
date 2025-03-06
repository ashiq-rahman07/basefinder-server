import { z } from 'zod';
import { UserRole } from './user.interface';



const userValidationSchema = z.object({
   body: z.object({
      email: z.string().email('Invalid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters long'),
      name: z.string().min(1, 'Name is required'),
      role: z.enum([UserRole.Landlord,UserRole.Tenant, UserRole.ADMIN]).default(UserRole.Tenant), // Match enum values in your code
      // Nested schema for client info
   })
});



export const UserValidation = {
   userValidationSchema,
  
};