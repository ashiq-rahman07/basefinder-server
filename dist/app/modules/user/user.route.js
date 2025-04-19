"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
// import validateRequest from '../../middlewares/validateRequest';
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_interface_1 = require("./user.interface");
// import auth from '../../middlewares/auth';
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(user_validation_1.UserValidation.userValidationSchema), user_controller_1.UserControllers.registerUserIntoDB);
router.get('/allusers', user_controller_1.UserControllers.getAllUsers);
router.post('/update-profile', (0, auth_1.default)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.Landlord, user_interface_1.UserRole.Tenant), user_controller_1.UserControllers.updateProfile);
router.get('/:id', (0, auth_1.default)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.Landlord, user_interface_1.UserRole.Tenant), user_controller_1.UserControllers.getSingleUsers);
// router.patch(
//   '/:id',
//   auth('admin', 'customer'),
//   validateRequest(UserValidation.userUpdateValidationSchema),
//   UserControllers.updateUser,
// );
// router.patch(
//   '/status/:userId',
//   auth('admin'),
//   validateRequest(UserValidation.userUpdateValidationSchema),
//   UserControllers.updateUserStatus,
// );
router.delete('/:id', (0, auth_1.default)(user_interface_1.UserRole.ADMIN), user_controller_1.UserControllers.deleteUser);
// router.get('/', auth(UserRole.ADMIN, UserRole.Landlord,UserRole.Tenant), UserControllers.getAllUsers);
router.get('/allusers', user_controller_1.UserControllers.getAllUsers);
router.post('/update-profile', (0, auth_1.default)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.Landlord, user_interface_1.UserRole.Tenant), user_controller_1.UserControllers.updateProfile);
router.get('/my-profile', user_controller_1.UserControllers.myProfile);
// router.patch(
//   '/update/:id',
//   validateRequest(UserValidation.userUpdateValidationSchema),
// );
exports.UserRoutes = router;
