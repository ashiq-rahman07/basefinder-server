"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    tenant: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    listing: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'RentalHouse',
        required: true,
    },
    requestId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'RentalHouse',
        required: true,
    },
    rentAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Cancelled'],
        default: 'Pending',
    },
    transaction: {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
        date_time: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const RentPayment = (0, mongoose_1.model)('RentPayment', PaymentSchema);
exports.default = RentPayment;
