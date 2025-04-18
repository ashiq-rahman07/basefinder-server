import  { model, Schema } from 'mongoose';
import { IPayment } from './rentpay.interface';


const PaymentSchema = new Schema<IPayment>(
  {
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    listing:{
        type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const RentPayment = model<IPayment>('RentPayment', PaymentSchema);
export default RentPayment;
