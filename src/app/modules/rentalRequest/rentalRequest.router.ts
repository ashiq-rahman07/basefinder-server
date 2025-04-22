import  express  from 'express';
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { UserRole } from "../user/user.interface";
import { RentalRequestController } from "./rentalRequest.controller";
import { RentalRequestValidation } from "./rentalRequest.validation";

const router = express.Router();

router.post(
  '/',
  
  // validateRequest(RentalRequestValidation.RentalRequestValidationSchema),
  auth(UserRole.Tenant),
RentalRequestController.createRentalRequest
);
router.get('/tenant', auth( UserRole.Tenant),RentalRequestController.getAllRentReqTenant);
router.get('/landlord', auth( UserRole.Landlord),RentalRequestController.getAllRentalRequestLandlord);
router.patch('/status/:requestId', auth(UserRole.Landlord),RentalRequestController.updateRequestStatus);
router.get('/:listingId', auth(UserRole.Tenant),RentalRequestController.getRequestListingTent);

router.get('/:id', auth(UserRole.ADMIN,UserRole.Landlord,UserRole.Tenant),RentalRequestController.getRenTalRequestById);


router.delete('/:id', auth(UserRole.ADMIN), RentalRequestController.deleteRenTalRequestById);
router.patch('/:id', auth(UserRole.ADMIN),RentalRequestController.updateRenTalRequestById);


router.get('/', auth(UserRole.Tenant,UserRole.ADMIN,UserRole.Tenant
  
),RentalRequestController.getAllRentalRequest);

export const RentalRequestRoutes = router;