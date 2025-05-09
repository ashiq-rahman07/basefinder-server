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
exports.RentalRequestServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const appError_1 = __importDefault(require("../../errors/appError"));
const rentalHose_model_1 = __importDefault(require("../rentalHouses/rentalHose.model"));
const rentalRequest_constant_1 = require("./rentalRequest.constant");
const rentalRequest_model_1 = __importDefault(require("./rentalRequest.model"));
const notification_model_1 = require("../notification/notification.model");
const user_model_1 = __importDefault(require("../user/user.model"));
const createRentalRequest = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const requestData = Object.assign(Object.assign({}, payload), { tenantId: userId });
    const rentalRequest = yield rentalRequest_model_1.default.create(requestData);
    // Step 3: Fetch the listing to find landlord info
    const listing = yield rentalHose_model_1.default.findById(payload.listingId).lean();
    if (!listing) {
        throw new Error('Listing not found');
    }
    const landlordId = listing.landlordUser;
    if (!landlordId) {
        throw new Error('Landlord not found for this listing');
    }
    // Step 4: Create notification for the landlord
    yield notification_model_1.Notification.create({
        senderId: userId,
        recipientId: landlordId,
        role: 'landlord',
        type: 'REQUEST_SUBMITTED',
        message: 'A new rental request has been submitted for your listing.',
        isRead: false,
    });
    const adminUsers = yield user_model_1.default.find({ role: 'admin' });
    const adminNotifications = adminUsers.map((admin) => ({
        senderId: userId, // or the actual landlord id if accessible
        recipientId: admin._id,
        role: 'admin',
        type: 'REQUEST_APPROVED',
        message: `Tenant make a request  for listing ${listing._id}`,
        isRead: false,
    }));
    yield notification_model_1.Notification.insertMany(adminNotifications);
    return rentalRequest;
});
const getAllRentalRequest = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const RentalRequestQuery = new QueryBuilder_1.default(rentalRequest_model_1.default.find(), query)
        .search(rentalRequest_constant_1.RentalRequestSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield RentalRequestQuery.modelQuery.populate('User');
    const meta = yield RentalRequestQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getAllRentReqTenant = (tenantId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const RentalRequestQuery = new QueryBuilder_1.default(rentalRequest_model_1.default.find({ tenantId }), query)
        .search(rentalRequest_constant_1.RentalRequestSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield RentalRequestQuery.modelQuery.populate('listingId', 'name location rentAmount images');
    const meta = yield RentalRequestQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getAllRentalRequestLandlord = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const listings = yield rentalHose_model_1.default.find({ landlordUser: userId }).select('_id');
    const listingIds = listings.map((listing) => listing._id);
    const result = yield rentalRequest_model_1.default.find({ listingId: { $in: listingIds } })
        .populate('listingId', 'location name rentAmount images')
        .populate('tenantId', 'name email');
    return result;
});
const getRequestListingTent = (tenantId, listingId) => __awaiter(void 0, void 0, void 0, function* () {
    const rentRequest = yield rentalRequest_model_1.default.findOne({ tenantId, listingId });
    return rentRequest;
});
const getRenTalRequestById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rentalRequest = yield rentalRequest_model_1.default.findById(id);
    return rentalRequest;
});
const updateRequestStatus = (id, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, landlordPhone } = payload;
    const request = yield rentalRequest_model_1.default.findById(id);
    if (!request) {
        return new appError_1.default(404, 'Rental Request Not Found');
    }
    try {
        const updateData = { status };
        // Add landlordPhone only if status is "Approved"
        if (status === 'Approved' && landlordPhone) {
            updateData.landlordPhone = landlordPhone;
        }
        const updatedRequest = yield rentalRequest_model_1.default.findByIdAndUpdate(id, updateData, { new: true } // Return the updated document
        );
        if (!updatedRequest) {
            throw new appError_1.default(404, 'Request not found');
            //   return res.status(404).json({ success: false, message: 'Request not found' });
        }
        // ✅ Create notification for tenant if approved
        if (status === 'Approved') {
            yield notification_model_1.Notification.create({
                senderId: userId,
                recipientId: request.tenantId,
                role: 'tenant',
                type: 'REQUEST_APPROVED',
                message: 'Your rental request has been approved!',
                isRead: false,
            });
        }
        if (status === 'Approved') {
            const adminUsers = yield user_model_1.default.find({ role: 'admin' });
            const adminNotifications = adminUsers.map((admin) => ({
                senderId: userId, // or the actual landlord id if accessible
                recipientId: admin._id,
                role: 'admin',
                type: 'REQUEST_APPROVED',
                message: `Landlord approved a rental request for listing ${request.listingId}`,
                isRead: false,
            }));
            yield notification_model_1.Notification.insertMany(adminNotifications);
        }
        // res.status(200).json({ success: true, data: updatedRequest });
        const result = {
            success: true,
            data: updatedRequest,
        };
        return result;
    }
    catch (error) {
        console.error('Error updating request status:', error);
        // res.status(500).json({ success: false, message: 'Failed to update request status' });
    }
});
const updateRenTalRequestById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const rentalRequest = yield rentalRequest_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return rentalRequest;
});
const deleteRenTalRequestById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rentalRequest = yield rentalRequest_model_1.default.findByIdAndDelete(id);
    return rentalRequest;
});
exports.RentalRequestServices = {
    createRentalRequest,
    getAllRentalRequest,
    getRenTalRequestById,
    updateRenTalRequestById,
    deleteRenTalRequestById,
    updateRequestStatus,
    getAllRentalRequestLandlord,
    getRequestListingTent,
    getAllRentReqTenant,
};
