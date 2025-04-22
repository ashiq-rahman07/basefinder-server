"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const user = yield user_model_1.default.findOne({ email: payload.email }).session(session);
        if (!user) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'This user is not found!');
        }
        if (!user.isActive) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is not active!');
        }
        if (!(yield user_model_1.default.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Password does not match');
        }
        const jwtPayload = {
            userId: user._id,
            name: user.name,
            email: user.email,
            isActive: user.isActive,
            role: user.role,
        };
        const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
        const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
        // const updateUserInfo = await User.findByIdAndUpdate(
        //    user._id,
        //    // { clientInfo: payload.clientInfo, lastLogin: Date.now() },
        //    { new: true, session }
        // );
        yield session.commitTransaction();
        return {
            accessToken,
            refreshToken,
        };
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
    }
    catch (err) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    const isUserExist = yield user_model_1.default.findById(userId);
    if (!isUserExist) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User does not exist');
    }
    if (!isUserExist.isActive) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User is not active');
    }
    const jwtPayload = {
        userId: isUserExist._id,
        name: isUserExist.name,
        email: isUserExist.email,
        isActive: isUserExist.isActive,
        role: isUserExist.role,
    };
    const newAccessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const user = yield user_model_1.default.findOne({ _id: userId });
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    if (!user.isActive) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'User account is inactive');
    }
    // Validate old password
    const isOldPasswordCorrect = yield user_model_1.default.isPasswordMatched(oldPassword, user.password);
    if (!isOldPasswordCorrect) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Incorrect old password');
    }
    // Hash and update the new password
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.default.updateOne({ _id: userId }, { password: hashedPassword });
    return { message: 'Password changed successfully' };
});
// const forgotPassword = async ({ email }: { email: string }) => {
//    const user = await User.findOne({ email: email });
//    if (!user) {
//       throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
//    }
//    if (!user.isActive) {
//       throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active!');
//    }
//    const otp = generateOtp();
//    const otpToken = jwt.sign({ otp, email }, config.jwt_otp_secret as string, {
//       expiresIn: '5m',
//    });
//    await User.updateOne({ email }, { otpToken });
//    try {
//       const emailContent = await EmailHelper.createEmailContent(
//          { otpCode: otp, userName: user.name },
//          'forgotPassword'
//       );
//       await EmailHelper.sendEmail(email, emailContent, "Reset Password OTP");
//    } catch (error) {
//       await User.updateOne({ email }, { $unset: { otpToken: 1 } });
//       throw new AppError(
//          StatusCodes.INTERNAL_SERVER_ERROR,
//          'Failed to send OTP email. Please try again later.'
//       );
//    }
// };
// const verifyOTP = async (
//    { email, otp }: { email: string, otp: string }
// ) => {
//    const user = await User.findOne({ email: email });
//    if (!user) {
//       throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
//    }
//    if (!user.otpToken || user.otpToken === '') {
//       throw new AppError(
//          StatusCodes.BAD_REQUEST,
//          'No OTP token found. Please request a new password reset OTP.'
//       );
//    }
//    const decodedOtpData = verifyToken(
//       user.otpToken as string,
//       config.jwt_otp_secret as string
//    );
//    if (!decodedOtpData) {
//       throw new AppError(
//          StatusCodes.FORBIDDEN,
//          'OTP has expired or is invalid'
//       );
//    }
//    if (decodedOtpData.otp !== otp) {
//       throw new AppError(StatusCodes.FORBIDDEN, 'Invalid OTP');
//    }
//    user.otpToken = null;
//    await user.save();
//    const resetToken = jwt.sign({ email }, config.jwt_pass_reset_secret as string, {
//       expiresIn: config.jwt_pass_reset_expires_in,
//    });
//    // Return the reset token
//    return {
//       resetToken
//    };
// }
const resetPassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ token, newPassword, }) {
    const session = yield user_model_1.default.startSession();
    try {
        session.startTransaction();
        const decodedData = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_pass_reset_secret);
        const user = yield user_model_1.default.findOne({
            email: decodedData.email,
            isActive: true,
        }).session(session);
        if (!user) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
        }
        const hashedPassword = yield bcrypt_1.default.hash(String(newPassword), Number(config_1.default.bcrypt_salt_rounds));
        yield user_model_1.default.updateOne({ email: user.email }, { password: hashedPassword }).session(session);
        yield session.commitTransaction();
        return {
            message: 'Password changed successfully',
        };
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
    // forgotPassword,
    // verifyOTP,
    resetPassword,
};
