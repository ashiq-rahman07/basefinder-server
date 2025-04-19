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
exports.RentalHouseController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const rentalHouse_service_1 = require("./rentalHouse.service");
const createRentalHouse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const result = yield rentalHouse_service_1.RentalHouseServices.createRentalHouse(req.body, files, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental House created successfully',
        statusCode: 201,
        data: result,
    });
}));
const getAllRentalHouse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rentalHouse_service_1.RentalHouseServices.getAllRentalHouse(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental House retrive successfully',
        statusCode: 201,
        data: result,
    });
}));
const getAllHouseByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const {user,query}=req
    //  console.log(user)
    const result = yield rentalHouse_service_1.RentalHouseServices.getAllHouseByUser(req);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental House retrive successfully',
        statusCode: 201,
        data: result,
    });
}));
const getRenTalHouseById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // console.log(id)
    const result = yield rentalHouse_service_1.RentalHouseServices.getRenTalHouseById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental House retrive successfully',
        statusCode: 201,
        data: result,
    });
}));
const updateRenTalHouseById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, body: payload, params: { houseId }, } = req;
    const result = yield rentalHouse_service_1.RentalHouseServices.updateRenTalHouseById(houseId, payload, req.files, user);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental House updated successfully',
        statusCode: 201,
        data: result,
    });
}));
const deleteRenTalHouseById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield rentalHouse_service_1.RentalHouseServices.deleteRenTalHouseById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Rental House deleted successfully',
        statusCode: 201,
        data: result,
    });
}));
exports.RentalHouseController = {
    createRentalHouse,
    getAllRentalHouse,
    getRenTalHouseById,
    updateRenTalHouseById,
    deleteRenTalHouseById,
    getAllHouseByUser
};
