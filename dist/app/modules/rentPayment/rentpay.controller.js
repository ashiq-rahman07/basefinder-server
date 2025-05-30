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
exports.RentPayController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const rentpay_service_1 = require("./rentpay.service");
const rentPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const rentPayment = yield rentpay_service_1.RentPayService.rentPayment(userId, req.body, req.ip);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Rent Payment successfully',
        data: rentPayment,
    });
}));
const getRentPayById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.user;
    const result = yield rentpay_service_1.RentPayService.getRentPayById(userId, id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'PaymentInfo retrive successfully',
        statusCode: 201,
        data: result,
    });
}));
const getRentPayByReqId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.user;
    const result = yield rentpay_service_1.RentPayService.getRentPayById(userId, id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'PaymentInfo retrive successfully',
        statusCode: 201,
        data: result,
    });
}));
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { order_id } = req.query;
    const order = yield rentpay_service_1.RentPayService.verifyPayment(order_id, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: 'Order verified successfully',
        data: order,
        success: true,
    });
}));
const getLandPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const paymentData = yield rentpay_service_1.RentPayService.getLandPayment(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: 'Landlord payment data get successfully',
        data: paymentData,
        success: true,
    });
}));
exports.RentPayController = {
    rentPayment,
    getRentPayById,
    getRentPayByReqId,
    verifyPayment,
    getLandPayment,
};
