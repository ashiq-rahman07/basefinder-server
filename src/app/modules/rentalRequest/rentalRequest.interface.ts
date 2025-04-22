import { ObjectId } from 'mongoose';

export interface IRentalRequest {
  listingId: ObjectId;
  tenantId: ObjectId;
  status: 'Pending' | 'Approved' | 'Rejected';
  landlordPhone?: string;
  moveDate: Date;
  rentDuration: string;
  paymentStatus?: 'Pending' | 'Paid' | 'Fail';
  message: string;
}
