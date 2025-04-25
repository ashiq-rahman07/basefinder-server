import mongoose, { Schema, Types } from 'mongoose';
import AppError from '../../errors/appError';
import RentalHouse from '../rentalHouses/rentalHose.model';
import RentalRequest from '../rentalRequest/rentalRequest.model';

import User from '../user/user.model';
import RentPayment from './rentpay.model';
import { RentPayUtils } from './rentpay.utils';

const rentPayment = async (
  tenant: string,
  payload: { listingId: string; requestId: string; rentAmount: number },
  client_ip: string
) => {
  const { listingId, rentAmount, requestId } = payload;

  try {
    const listing = await RentalHouse.findById(listingId);
    if (!listing) {
      return new AppError(401, 'listing not found');
    }

    const tenantDetails = await User.findById(tenant);

    let rentPay = await RentPayment.create({
      tenant,
      listing: listingId,
      requestId,
      rentAmount,
    });

    // payment integration
    const shurjopayPayload = {
      amount: rentAmount,
      order_id: rentPay._id,
      currency: 'BDT',
      customer_name: tenantDetails?.name,
      customer_address: 'abccv',
      customer_email: tenantDetails?.name,
      customer_phone: '11111111111',
      customer_city: 'dhaka',
      client_ip,
    };

    const payment = await RentPayUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
      rentPay = await rentPay.updateOne({
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      });
    }

    return payment.checkout_url;
  } catch (error) {
    console.log(error);
  }
};

const getRentPayById = async (tenantId: string, id: string) => {
  const paymentInfo = await RentPayment.findOne({
    'transaction.id': id,
    tenant: tenantId,
  });

  return paymentInfo;
};
const getRentPayByReqId = async (tenantId: string, id: string) => {
  const paymentInfo = await RentPayment.findOne({
    requestId: id,
    tenant: tenantId,
  });

  return paymentInfo;
};
const verifyPayment = async (order_id: string, userId: string) => {
  const verifiedPayment = await RentPayUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await RentPayment.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      }
    );
  }

  if (verifiedPayment[0].bank_status == 'Success') {
    const paymentData = await RentPayment.findOne({
      'transaction.id': order_id,
    });
    await RentalRequest.findOneAndUpdate(
      {
        listingId: paymentData?.listing,
        tenantId: userId,
        status: { $ne: 'Rejected' },
      },
      { $set: { paymentStatus: 'Paid' } },
      { new: true }
    );
  }

  return verifiedPayment;
};
const getLandPayment = async (userId: string) => {
  const landlordPayments = await RentPayment.aggregate([
    {
      $lookup: {
        from: 'rentalhouses', // collection name, not the model name
        localField: 'listing',
        foreignField: '_id',
        as: 'listingInfo',
      },
    },
    {
      $unwind: '$listingInfo',
    },
    {
      $match: {
        'listingInfo.landlordUser': new Types.ObjectId(userId),
      },
    },
    {
      $project: {
        _id: 1,
        tenant: 1,
        listing: 1,
        rentAmount: 1,
        status: 1,
        createdAt: 1,
        transaction: 1,
        listingName: '$listingInfo.name',
        listingLocation: '$listingInfo.location',
        listingImages: '$listingInfo.images',
      },
    },
  ]);

  return landlordPayments;
};

export const RentPayService = {
  rentPayment,
  getRentPayById,
  getRentPayByReqId,
  verifyPayment,
  getLandPayment,
};
