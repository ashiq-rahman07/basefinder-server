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
exports.NotificationController = exports.deleteAllNotifications = exports.deleteNotification = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const notification_model_1 = require("./notification.model");
const notification_service_1 = require("./notification.service");
// const createRentalRequest = catchAsync(async (req, res) => {
//   const { userId } = req.user;
//   const result = await NotificationServices.createNotification(
//     userId,
//     req.body
//   );
//   sendResponse(res, {
//     success: true,
//     message: 'Rental Request created successfully',
//     statusCode: 201,
//     data: result,
//   });
// });
const markAsRead = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield notification_service_1.NotificationServices.markAsRead(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental Request retrive successfully',
        statusCode: 201,
        data: result,
    });
}));
const getMyNotifications = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const role = req.user.role;
    const result = yield notification_service_1.NotificationServices.getMyNotifications(userId, role);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Notification  retrieve successfully',
        statusCode: 201,
        data: result,
    });
}));
const updateNotification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    // const role = req.user.role;
    const result = yield notification_service_1.NotificationServices.updateNotification(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Notification Updated successfully',
        statusCode: 201,
        data: result,
    });
}));
exports.deleteNotification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.userId;
    const result = yield notification_service_1.NotificationServices.deleteNotification(id, userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Notification deleted successfully',
        data: result,
    });
}));
exports.deleteAllNotifications = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    yield notification_model_1.Notification.deleteMany({ recipientId: userId });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'All notifications deleted successfully',
        data: null,
    });
}));
exports.NotificationController = {
    getMyNotifications,
    //   createRentalRequest,
    markAsRead,
    updateNotification,
    deleteNotification: exports.deleteNotification,
    deleteAllNotifications: exports.deleteAllNotifications,
};
