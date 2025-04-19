"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    // jwt_otp_secret: process.env.JWT_OTP_SECRET,
    jwt_pass_reset_secret: process.env.JWT_PASS_RESET_SECRET,
    jwt_pass_reset_expires_in: process.env.JWT_PASS_RESET_EXPIRES_IN,
    // admin_email: process.env.ADMIN_EMAIL,
    // admin_password: process.env.ADMIN_PASSWORD,
    // admin_profile_photo: process.env.ADMIN_PROFILE_PHOTO,
    // admin_mobile_number: process.env.ADMIN_MOBILE_NUMBER,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    // sender_email: process.env.SENDER_EMAIL,
    // sender_app_password: process.env.SENDER_APP_PASS,
    // ssl: {
    //    store_name: process.env.STORE_NAME,
    //    payment_api: process.env.PAYMENT_API,
    //    validation_api: process.env.VALIDATION_API,
    //    store_id: process.env.STORE_ID,
    //    store_pass: process.env.STORE_PASSWORD,
    //    validation_url: process.env.VALIDATION_URL,
    //    success_url: process.env.SUCCESS_URL,
    //    failed_url: process.env.FAILED_URL,
    //    cancel_url: process.env.CANCEL_URL,
    // },
    sp: {
        sp_endpoint: process.env.SP_ENDPOINT,
        sp_username: process.env.SP_USERNAME,
        sp_password: process.env.SP_PASSWORD,
        sp_prefix: process.env.SP_PREFIX,
        sp_return_url: process.env.SP_RETURN_URL,
    },
};
