"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    senderId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    recipientId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    role: {
        type: String,
        enum: ['tenant', 'landlord', 'admin'],
        required: true,
    },
    type: {
        type: String,
        enum: ['REQUEST_SUBMITTED', 'REQUEST_APPROVED', 'PAYMENT_COMPLETED'],
        required: true,
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });
exports.Notification = (0, mongoose_1.model)('Notification', notificationSchema);
