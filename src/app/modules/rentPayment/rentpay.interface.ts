import { Document, Types } from 'mongoose';

export interface IPayment extends Document {
  tenant: Types.ObjectId;
  listing: Types.ObjectId;
  requestId: Types.ObjectId;
  rentAmount: number;
  status: 'Pending' | 'Paid' | 'Cancelled';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
