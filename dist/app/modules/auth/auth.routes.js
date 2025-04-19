"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
// import clientInfoParser from '../../middleware/clientInfoParser';
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_interface_1 = require("../user/user.interface");
// import validateRequest from '../../middleware/validateRequest';
// import { AuthValidation } from './auth.validation';
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.AuthController.loginUser);
router.post('/refresh-token', 
// validateRequest(AuthValidation.refreshTokenZodSchema),
auth_controller_1.AuthController.refreshToken);
router.post('/change-password', (0, auth_1.default)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.Landlord, user_interface_1.UserRole.Tenant), auth_controller_1.AuthController.changePassword);
// router.post('/forgot-password', AuthController.forgotPassword);
// router.post('/verify-otp', AuthController.verifyOTP);
router.post('/reset-password', auth_controller_1.AuthController.resetPassword);
exports.AuthRoutes = router;
