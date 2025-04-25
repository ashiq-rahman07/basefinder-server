"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalNotification = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_interface_1 = require("../user/user.interface");
const notification_controller_1 = require("./notification.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_interface_1.UserRole.Tenant, user_interface_1.UserRole.Landlord, user_interface_1.UserRole.ADMIN), notification_controller_1.NotificationController.getMyNotifications);
router.patch('/mark-all-as-read', (0, auth_1.default)(user_interface_1.UserRole.Tenant, user_interface_1.UserRole.Landlord, user_interface_1.UserRole.ADMIN), notification_controller_1.NotificationController.updateNotification);
router.delete('/delete-all', (0, auth_1.default)(user_interface_1.UserRole.Tenant, user_interface_1.UserRole.Landlord, user_interface_1.UserRole.ADMIN), notification_controller_1.NotificationController.deleteAllNotifications);
router.patch('/:id', (0, auth_1.default)(user_interface_1.UserRole.Tenant, user_interface_1.UserRole.Landlord, user_interface_1.UserRole.ADMIN), notification_controller_1.NotificationController.markAsRead);
router.delete('/:id', (0, auth_1.default)(user_interface_1.UserRole.Tenant, user_interface_1.UserRole.Landlord, user_interface_1.UserRole.ADMIN), notification_controller_1.NotificationController.deleteNotification);
exports.RentalNotification = router;
