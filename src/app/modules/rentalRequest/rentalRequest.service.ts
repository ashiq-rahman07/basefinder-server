import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appError';
import RentalHouse from '../rentalHouses/rentalHose.model';
import { RentalRequestSearchableFields } from './rentalRequest.constant';
import { IRentalRequest } from './rentalRequest.interface';
import RentalRequest from './rentalRequest.model';
import { Notification } from '../notification/notification.model';
import User from '../user/user.model';

const createRentalRequest = async (userId: string, payload: IRentalRequest) => {
  const requestData = {
    ...payload,
    tenantId: userId,
  };

  const rentalRequest = await RentalRequest.create(requestData);

  // Step 3: Fetch the listing to find landlord info
  const listing = await RentalHouse.findById(payload.listingId).lean();

  if (!listing) {
    throw new Error('Listing not found');
  }

  const landlordId = listing.landlordUser;

  if (!landlordId) {
    throw new Error('Landlord not found for this listing');
  }

  // Step 4: Create notification for the landlord
  await Notification.create({
    senderId: userId,
    recipientId: landlordId,
    role: 'landlord',
    type: 'REQUEST_SUBMITTED',
    message: 'A new rental request has been submitted for your listing.',
    isRead: false,
  });

  const adminUsers = await User.find({ role: 'admin' });

  const adminNotifications = adminUsers.map((admin) => ({
    senderId: userId, // or the actual landlord id if accessible
    recipientId: admin._id,
    role: 'admin',
    type: 'REQUEST_APPROVED',
    message: `Tenant make a request  for listing ${listing._id}`,
    isRead: false,
  }));
  await Notification.insertMany(adminNotifications);

  return rentalRequest;
};

const getAllRentalRequest = async (query: Record<string, unknown>) => {
  const RentalRequestQuery = new QueryBuilder(RentalRequest.find(), query)
    .search(RentalRequestSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await RentalRequestQuery.modelQuery.populate('User');
  const meta = await RentalRequestQuery.countTotal();
  return {
    result,
    meta,
  };
};
const getAllRentReqTenant = async (
  tenantId: string,
  query: Record<string, unknown>
) => {
  const RentalRequestQuery = new QueryBuilder(
    RentalRequest.find({ tenantId }),
    query
  )
    .search(RentalRequestSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await RentalRequestQuery.modelQuery.populate(
    'listingId',
    'name location rentAmount images'
  );

  const meta = await RentalRequestQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getAllRentalRequestLandlord = async (userId: string) => {
  const listings = await RentalHouse.find({ landlordUser: userId }).select(
    '_id'
  );
  const listingIds = listings.map((listing) => listing._id);

  const result = await RentalRequest.find({ listingId: { $in: listingIds } })
    .populate('listingId', 'location name rentAmount images')
    .populate('tenantId', 'name email');

  return result;
};

const getRequestListingTent = async (tenantId: string, listingId: string) => {
  const rentRequest = await RentalRequest.findOne({ tenantId, listingId });

  return rentRequest;
};

const getRenTalRequestById = async (id: string) => {
  const rentalRequest = await RentalRequest.findById(id);
  return rentalRequest;
};
const updateRequestStatus = async (
  id: string,
  userId: string,
  payload: { status: string; landlordPhone?: string }
) => {
  const { status, landlordPhone } = payload;
  const request = await RentalRequest.findById(id);
  if (!request) {
    return new AppError(404, 'Rental Request Not Found');
  }

  try {
    const updateData: { status: string; landlordPhone?: string } = { status };

    // Add landlordPhone only if status is "Approved"
    if (status === 'Approved' && landlordPhone) {
      updateData.landlordPhone = landlordPhone;
    }

    const updatedRequest = await RentalRequest.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedRequest) {
      throw new AppError(404, 'Request not found');
      //   return res.status(404).json({ success: false, message: 'Request not found' });
    }
    // ✅ Create notification for tenant if approved
    if (status === 'Approved') {
      await Notification.create({
        senderId: userId,
        recipientId: request.tenantId,
        role: 'tenant',
        type: 'REQUEST_APPROVED',
        message: 'Your rental request has been approved!',
        isRead: false,
      });
    }

    if (status === 'Approved') {
      const adminUsers = await User.find({ role: 'admin' });

      const adminNotifications = adminUsers.map((admin) => ({
        senderId: userId, // or the actual landlord id if accessible
        recipientId: admin._id,
        role: 'admin',
        type: 'REQUEST_APPROVED',
        message: `Landlord approved a rental request for listing ${request.listingId}`,
        isRead: false,
      }));

      await Notification.insertMany(adminNotifications);
    }
    // res.status(200).json({ success: true, data: updatedRequest });
    const result = {
      success: true,
      data: updatedRequest,
    };

    return result;
  } catch (error) {
    console.error('Error updating request status:', error);
    // res.status(500).json({ success: false, message: 'Failed to update request status' });
  }
};

const updateRenTalRequestById = async (
  id: string,
  payload: Partial<IRentalRequest>
) => {
  const rentalRequest = await RentalRequest.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return rentalRequest;
};
const deleteRenTalRequestById = async (id: string) => {
  const rentalRequest = await RentalRequest.findByIdAndDelete(id);
  return rentalRequest;
};

export const RentalRequestServices = {
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
