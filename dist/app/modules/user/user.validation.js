"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
        name: zod_1.z.string().min(1, 'Name is required'),
        role: zod_1.z
            .enum([user_interface_1.UserRole.Landlord, user_interface_1.UserRole.Tenant, user_interface_1.UserRole.ADMIN])
            .default(user_interface_1.UserRole.Tenant), // Match enum values in your code
        // Nested schema for client info
    }),
});
exports.UserValidation = {
    userValidationSchema,
};
