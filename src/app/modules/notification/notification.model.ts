import { Schema, model, Types } from 'mongoose';
import { INotification } from './notification.interface';

const notificationSchema = new Schema<INotification>(
  {
    senderId: { type: Types.ObjectId, ref: 'User', required: true },
    recipientId: { type: Types.ObjectId, ref: 'User', required: true },
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
  },
  { timestamps: true }
);

export const Notification = model('Notification', notificationSchema);
