"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalRequestValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const RentalRequestValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        listingId: zod_1.z.string().refine((val) => (0, mongoose_1.isValidObjectId)(val), {
            message: 'Invalid ObjectId',
        }),
        status: zod_1.z.enum(['Pending', 'Approved', 'Rejected']),
        paymentStatus: zod_1.z.enum(['Pending', 'Paid', 'Failed']).optional(),
        tenantId: zod_1.z
            .string()
            .refine((val) => (0, mongoose_1.isValidObjectId)(val), {
            message: 'Invalid ObjectId',
        })
            .optional(),
        moveDate: zod_1.z.date(),
        rentDuration: zod_1.z.string(),
        message: zod_1.z.string(),
        landlordPhone: zod_1.z.string().optional(),
    }),
});
exports.RentalRequestValidation = {
    RentalRequestValidationSchema,
};
