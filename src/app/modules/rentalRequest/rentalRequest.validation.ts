import { isValidObjectId } from "mongoose";
import { z } from "zod";


const RentalRequestValidationSchema = z.object({
    body:z.object({
        listingId:  z.string().refine((val) => isValidObjectId(val), {
            message: "Invalid ObjectId",
             }),
        status: z.enum(
            ['Pending','Approved','Rejected']
            ),
        paymentStatus: z.enum(["Pending","Paid","Failed"]).optional(),
        tenantId: z.string().refine((val) => isValidObjectId(val), {
                            message: "Invalid ObjectId",
                        }).optional(),
        moveDate:z.date(),
        rentDuration:z.string(),                      
        message:z.string(),
        landlordPhone:z.string().optional(),
    })
  });

  export const RentalRequestValidation = {
    RentalRequestValidationSchema,
  } 