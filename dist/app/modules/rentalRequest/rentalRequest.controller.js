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
exports.RentalRequestController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const rentalRequest_service_1 = require("./rentalRequest.service");
const createRentalRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield rentalRequest_service_1.RentalRequestServices.createRentalRequest(userId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental Request created successfully',
        statusCode: 201,
        data: result,
    });
}));
const getAllRentalRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rentalRequest_service_1.RentalRequestServices.getAllRentalRequest(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental Request retrive successfully',
        statusCode: 201,
        data: result,
    });
}));
const getAllRentReqTenant = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield rentalRequest_service_1.RentalRequestServices.getAllRentReqTenant(userId, req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental Request retrive successfully',
        statusCode: 201,
        data: result,
    });
}));
const getAllRentalRequestLandlord = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield rentalRequest_service_1.RentalRequestServices.getAllRentalRequestLandlord(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental Request retrive successfully',
        statusCode: 201,
        data: result,
    });
}));
const getRequestListingTent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { listingId } = req.params;
    const result = yield rentalRequest_service_1.RentalRequestServices.getRequestListingTent(userId, listingId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental Request retrive successfully',
        statusCode: 201,
        data: result,
    });
}));
const getRenTalRequestById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield rentalRequest_service_1.RentalRequestServices.getRenTalRequestById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental Request retrive successfully',
        statusCode: 201,
        data: result,
    });
}));
const updateRenTalRequestById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield rentalRequest_service_1.RentalRequestServices.updateRenTalRequestById(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental Request updated successfully',
        statusCode: 201,
        data: result,
    });
}));
const updateRequestStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.params;
    const result = yield rentalRequest_service_1.RentalRequestServices.updateRequestStatus(requestId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental Request Approved successfully',
        statusCode: 201,
        data: result,
    });
}));
const deleteRenTalRequestById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield rentalRequest_service_1.RentalRequestServices.deleteRenTalRequestById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental Request deleted successfully',
        statusCode: 201,
        data: result,
    });
}));
exports.RentalRequestController = {
    createRentalRequest,
    getAllRentalRequest,
    getAllRentalRequestLandlord,
    getRenTalRequestById,
    updateRenTalRequestById,
    deleteRenTalRequestById,
    updateRequestStatus,
    getRequestListingTent,
    getAllRentReqTenant
};
