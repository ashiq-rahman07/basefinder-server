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
exports.RentPayService = void 0;
const appError_1 = __importDefault(require("../../errors/appError"));
const rentalHose_model_1 = __importDefault(require("../rentalHouses/rentalHose.model"));
const rentalRequest_model_1 = __importDefault(require("../rentalRequest/rentalRequest.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const rentpay_model_1 = __importDefault(require("./rentpay.model"));
const rentpay_utils_1 = require("./rentpay.utils");
const rentPayment = (tenant, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(tenant);
    console.log(payload, "payload");
    const { listingId, rentAmount } = payload;
    try {
        const listing = yield rentalHose_model_1.default.findById(listingId);
        if (!listing) {
            return new appError_1.default(401, 'listing not found');
        }
        const tenantDetails = yield user_model_1.default.findById(tenant);
        let rentPay = yield rentpay_model_1.default.create({
            tenant,
            listing: listingId,
            rentAmount
        });
        // payment integration
        const shurjopayPayload = {
            amount: rentAmount,
            order_id: rentPay._id,
            currency: 'BDT',
            customer_name: tenantDetails === null || tenantDetails === void 0 ? void 0 : tenantDetails.name,
            customer_address: 'abccv',
            customer_email: tenantDetails === null || tenantDetails === void 0 ? void 0 : tenantDetails.name,
            customer_phone: '11111111111',
            customer_city: 'dhaka',
            client_ip,
        };
        const payment = yield rentpay_utils_1.RentPayUtils.makePaymentAsync(shurjopayPayload);
        if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
            rentPay = yield rentPay.updateOne({
                transaction: {
                    id: payment.sp_order_id,
                    transactionStatus: payment.transactionStatus,
                },
            });
        }
        return payment.checkout_url;
    }
    catch (error) {
        console.log(error);
    }
});
const getRentPayById = (tenantId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentInfo = yield rentpay_model_1.default.findOne({ 'transaction.id': id, tenant: tenantId });
    return paymentInfo;
});
const verifyPayment = (order_id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield rentpay_utils_1.RentPayUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield rentpay_model_1.default.findOneAndUpdate({
            'transaction.id': order_id,
        }, {
            'transaction.bank_status': verifiedPayment[0].bank_status,
            'transaction.sp_code': verifiedPayment[0].sp_code,
            'transaction.sp_message': verifiedPayment[0].sp_message,
            'transaction.transactionStatus': verifiedPayment[0].transaction_status,
            'transaction.method': verifiedPayment[0].method,
            'transaction.date_time': verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == 'Success'
                ? 'Paid'
                : verifiedPayment[0].bank_status == 'Failed'
                    ? 'Pending'
                    : verifiedPayment[0].bank_status == 'Cancel'
                        ? 'Cancelled'
                        : '',
        });
    }
    if (verifiedPayment[0].bank_status == 'Success') {
        const paymentData = yield rentpay_model_1.default.findOne({ 'transaction.id': order_id });
        yield rentalRequest_model_1.default.findOneAndUpdate({
            listingId: paymentData === null || paymentData === void 0 ? void 0 : paymentData.listing,
            tenantId: userId,
            status: { $ne: 'Rejected' }
        }, { $set: { paymentStatus: 'Paid' } }, { new: true });
    }
    return verifiedPayment;
});
exports.RentPayService = {
    rentPayment,
    getRentPayById,
    verifyPayment
};
