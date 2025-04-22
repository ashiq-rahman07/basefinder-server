"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRouter = void 0;
const express_1 = __importDefault(require("express"));
const rentpay_controller_1 = require("./rentpay.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_interface_1 = require("../user/user.interface");
const router = express_1.default.Router();
router.post('/create-payment', (0, auth_1.default)(user_interface_1.UserRole.Tenant), rentpay_controller_1.RentPayController.rentPayment);
router.get('/verify', (0, auth_1.default)(user_interface_1.UserRole.Tenant, user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.Landlord), rentpay_controller_1.RentPayController.verifyPayment);
router.get('/request/:id', (0, auth_1.default)(user_interface_1.UserRole.Tenant, user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.Landlord), rentpay_controller_1.RentPayController.getRentPayByReqId);
router.get('/:id', (0, auth_1.default)(user_interface_1.UserRole.Tenant, user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.Landlord), rentpay_controller_1.RentPayController.getRentPayById);
//   '/verify',
//   auth('admin', 'customer'),
//   OrderControllers.verifyPayment,
// );
// router.get('/:userId', auth('customer'), OrderControllers.getUserOrders);
// router.get('/', auth('admin'), OrderControllers.getAllOrders);
// router.patch(
//   '/status/:orderId',
//   auth('admin'),
//   OrderControllers.updateOrderStatus,
// );
// router.delete('/:orderId', auth('admin'), OrderControllers.deleteUser);
// router.get('/revenue', OrderControllers.getTotalRevenue);
exports.PaymentRouter = router;
