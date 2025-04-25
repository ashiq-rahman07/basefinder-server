"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationServices = exports.markAsRead = exports.updateNotification = exports.getMyNotifications = exports.createNotification = void 0;
const appError_1 = __importDefault(require("../../errors/appError"));
const notification_model_1 = require("./notification.model");
const createNotification = (_a) => __awaiter(void 0, [_a], void 0, function* ({ recipient, role, message, }) {
    const notification = yield notification_model_1.Notification.create({ recipient, role, message });
    return notification;
});
exports.createNotification = createNotification;
const getMyNotifications = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId = req.user.userId; // assuming from auth middleware
    // const role = req.user.role;
    if (role === 'admin') {
        // Admin sees all admin notifications
        const notifications = yield notification_model_1.Notification.find({ role: 'admin' }).sort({
            createdAt: -1,
        });
        return notifications;
    }
    else {
        // Tenant or Landlord sees only their own
        const notifications = yield notification_model_1.Notification.find({
            recipientId: userId,
            role: role,
        }).sort({ createdAt: -1 });
        return notifications;
    }
});
exports.getMyNotifications = getMyNotifications;
const updateNotification = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId = req.user.userId; // assuming from auth middleware
    // Assuming the userId is part of the authenticated user
    // Update all notifications related to the user to 'read'
    const updatedNotifications = yield notification_model_1.Notification.updateMany({ recipientId: userId, isRead: false }, // Only target unread notifications
    { $set: { isRead: true } } // Mark as read
    );
    if (updatedNotifications.modifiedCount === 0) {
        return { success: false, message: 'No notifications to mark as read.' };
    }
    return updatedNotifications;
});
exports.updateNotification = updateNotification;
const deleteNotification = (notificationId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield notification_model_1.Notification.findOne({
        _id: notificationId,
        recipientId: userId,
    });
    if (!notification) {
        throw new appError_1.default(404, 'Notification not found or not authorized');
    }
    yield notification_model_1.Notification.findByIdAndDelete(notificationId);
    return { deletedId: notificationId };
});
const markAsRead = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield notification_model_1.Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
});
exports.markAsRead = markAsRead;
exports.NotificationServices = {
    createNotification: exports.createNotification,
    updateNotification: exports.updateNotification,
    getMyNotifications: exports.getMyNotifications,
    markAsRead: exports.markAsRead,
    deleteNotification,
};
