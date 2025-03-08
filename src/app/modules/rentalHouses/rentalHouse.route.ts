import  express  from 'express';
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { UserRole } from "../user/user.interface";
import { RentalHouseController } from "./rentalHose.controller";
import { RentalHouseValidation } from "./rentalHouse.validation";
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middleware/bodyParser';

const router = express.Router();

router.post(
  '/landlords/listings',
  auth(UserRole.Landlord),
  multerUpload.fields([{ name: 'images' }]),
  parseBody,
  validateRequest(RentalHouseValidation.RentalHouseValidationSchema),
 
RentalHouseController.createRentalHouse
);
router.get('/landlords/listings/:id', auth(UserRole.ADMIN,UserRole.Landlord,UserRole.Tenant), RentalHouseController.getRenTalHouseById);

router.delete('/landlords/listings/:id', auth(UserRole.ADMIN), RentalHouseController.deleteRenTalHouseById);
router.patch('/landlords/listings/:id', auth(UserRole.ADMIN), RentalHouseController.updateRenTalHouseById);
router.get('/landlords/listings',RentalHouseController.getAllRentalHouse);

export const RentalHouseRoutes = router;