import { ObjectId } from "mongoose";



export interface IRentalRequest {
    listingId:ObjectId; // ID of the rental house listing
    tenantId: ObjectId; // ID of the tenant submitting the request
    status: 'Pending' | 'Approved' | 'Rejected'; // Request status
    landlordPhone?: string; // Landlord's phone number (if approved)
    paymentStatus?: 'Pending' | 'Paid'|'Fail'; // Payment status (if approved)
    message: string; // Additional message from the tenant
   
  }
  