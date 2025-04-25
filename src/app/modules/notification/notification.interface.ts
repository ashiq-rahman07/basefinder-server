import { ObjectId } from 'mongoose';

export type UserRole = 'admin' | 'landlord' | 'tenant';

export type NotificationType =
  | 'REQUEST_SUBMITTED' // tenant → landlord
  | 'REQUEST_APPROVED' // landlord → tenant
  | 'PAYMENT_COMPLETED'; // system → admin

export interface INotification {
  _id?: ObjectId;
  senderId: ObjectId; // who triggered the action
  recipientId: ObjectId; // who will receive the notification
  role: UserRole; // role of the recipient
  type: NotificationType; // type of notification
  message: string; // display message
  isRead: boolean; // default false
  createdAt?: Date;
  updatedAt?: Date;
}
