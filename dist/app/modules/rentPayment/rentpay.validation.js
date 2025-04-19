"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const paymentValidationSchema = zod_1.z.object({
    listing: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ObjectId'), // Validates a MongoDB ObjectId
    rentAmount: zod_1.z.number().min(0), // Total price must be non-negative
});
exports.default = paymentValidationSchema;
