import  express  from 'express';
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { UserRole } from "../user/user.interface";
import { RentalRequestController } from "./rentalRequest.controller";
import { RentalRequestValidation } from "./rentalRequest.validation";

const router = express.Router();

router.post(
  '/create-rental-request',
  
  validateRequest(RentalRequestValidation.RentalRequestValidationSchema),
RentalRequestController.createRentalRequest
);
router.get('/:id', auth(UserRole.ADMIN,UserRole.Landlord,UserRole.Tenant),RentalRequestController.getRenTalRequestById);

router.delete('/:id', auth(UserRole.ADMIN), RentalRequestController.deleteRenTalRequestById);
router.patch('/:id', auth(UserRole.ADMIN),RentalRequestController.updateRenTalRequestById);
router.get('/', auth(UserRole.ADMIN, UserRole.Landlord,UserRole.Tenant),RentalRequestController.getAllRentalRequest);

export const RentalRequestRoutes = router;