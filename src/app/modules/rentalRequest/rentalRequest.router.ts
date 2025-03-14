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
router.get('/:id', auth(UserRole.ADMIN,UserRole.Landlord,UserRole.Tenant),RentalRequestController.getRenTalRequestById);

router.delete('/:id', auth(UserRole.ADMIN), RentalRequestController.deleteRenTalRequestById);
router.patch('/:id', auth(UserRole.ADMIN),RentalRequestController.updateRenTalRequestById);
router.get('/landlord', auth( UserRole.Landlord),RentalRequestController.getAllRentalRequestLandlord);
router.get('/', auth(UserRole.Tenant),RentalRequestController.getAllRentalRequest);

export const RentalRequestRoutes = router;