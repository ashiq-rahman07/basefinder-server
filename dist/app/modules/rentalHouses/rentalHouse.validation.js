"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalHouseValidation = void 0;
const zod_1 = require("zod");
const RentalHouseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        location: zod_1.z.string(),
        description: zod_1.z.string(),
        rentAmount: zod_1.z.number(),
        bedrooms: zod_1.z.number(),
        bathrooms: zod_1.z.number(),
        amenities: zod_1.z.array(zod_1.z.string()).optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.RentalHouseValidation = {
    RentalHouseValidationSchema,
};
