import { isValidObjectId } from "mongoose";
import { z } from "zod";
import { RentalRequestStatus } from "./rentalRequest.interface";

const RentalRequestValidationSchema = z.object({
    body:z.object({
        houseId:  z.string().refine((val) => isValidObjectId(val), {
            message: "Invalid ObjectId",
             }),
        status: z.enum(
            [RentalRequestStatus.ACCEPTED,RentalRequestStatus.PENDING,RentalRequestStatus.   REJECTED]
            ).optional(),
        paymentStatus: z.enum(["pending","paid","failed"]).optional(),
        tenantUser: z.string().refine((val) => isValidObjectId(val), {
                            message: "Invalid ObjectId",
                        }),
        message:z.string() 
    })
  });

  export const RentalRequestValidation = {
    RentalRequestValidationSchema,
  } 