"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalRequestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_interface_1 = require("../user/user.interface");
const rentalRequest_controller_1 = require("./rentalRequest.controller");
const router = express_1.default.Router();
router.post('/', 
// validateRequest(RentalRequestValidation.RentalRequestValidationSchema),
(0, auth_1.default)(user_interface_1.UserRole.Tenant), rentalRequest_controller_1.RentalRequestController.createRentalRequest);
router.get('/tenant', (0, auth_1.default)(user_interface_1.UserRole.Tenant), rentalRequest_controller_1.RentalRequestController.getAllRentReqTenant);
router.get('/landlord', (0, auth_1.default)(user_interface_1.UserRole.Landlord), rentalRequest_controller_1.RentalRequestController.getAllRentalRequestLandlord);
router.patch('/status/:requestId', (0, auth_1.default)(user_interface_1.UserRole.Landlord), rentalRequest_controller_1.RentalRequestController.updateRequestStatus);
router.get('/:listingId', (0, auth_1.default)(user_interface_1.UserRole.Tenant), rentalRequest_controller_1.RentalRequestController.getRequestListingTent);
router.get('/:id', (0, auth_1.default)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.Landlord, user_interface_1.UserRole.Tenant), rentalRequest_controller_1.RentalRequestController.getRenTalRequestById);
router.delete('/:id', (0, auth_1.default)(user_interface_1.UserRole.ADMIN), rentalRequest_controller_1.RentalRequestController.deleteRenTalRequestById);
router.patch('/:id', (0, auth_1.default)(user_interface_1.UserRole.ADMIN), rentalRequest_controller_1.RentalRequestController.updateRenTalRequestById);
router.get('/', (0, auth_1.default)(user_interface_1.UserRole.Tenant), rentalRequest_controller_1.RentalRequestController.getAllRentalRequest);
exports.RentalRequestRoutes = router;
