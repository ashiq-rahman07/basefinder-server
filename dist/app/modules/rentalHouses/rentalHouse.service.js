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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalHouseServices = void 0;
const rentalHose_model_1 = __importDefault(require("./rentalHose.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const rentalHouse_constant_1 = require("./rentalHouse.constant");
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = __importDefault(require("../user/user.model"));
const rentalRequest_model_1 = __importDefault(require("../rentalRequest/rentalRequest.model"));
const createRentalHouse = (houseData, houseImages, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { images } = houseImages;
    if (!images || images.length === 0) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Product images are required.');
    }
    houseData.images = images.map((image) => image.path);
    const createHouse = new rentalHose_model_1.default(Object.assign(Object.assign({}, houseData), { landlordUser: authUser.userId }));
    const result = yield createHouse.save();
    // houseData.images = images.map((image) => image.path);
    // const rentalHouse = await RentalHouse.create(houseData);
    // return rentalHouse;
    return result;
});
const getAllRentalHouse = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(query);
    const { categories, bedrooms, minPrice, maxPrice } = query, pQuery = __rest(query, ["categories", "bedrooms", "minPrice", "maxPrice"]);
    // Build the filter object
    const filter = {};
    // console.log(categories);
    // Filter by categories
    if (categories) {
        const categoryArray = typeof categories === 'string'
            ? categories.split(',')
            : Array.isArray(categories)
                ? categories
                : [categories];
        filter.category = { $in: categoryArray };
    }
    if (bedrooms) {
        filter.bedrooms = { $in: bedrooms };
    }
    const RentalHouseQuery = new QueryBuilder_1.default(rentalHose_model_1.default.find(filter).populate('landlordUser').populate("category", "_id name").setOptions({ strictPopulate: false }), pQuery)
        .search(['name', 'location'])
        .filter()
        .sort()
        .paginate()
        .fields()
        .priceRange(Number(minPrice) || 0, Number(maxPrice) || Infinity);
    const result = yield RentalHouseQuery.modelQuery.populate('User');
    //  console.log(result);
    const meta = yield RentalHouseQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getAllHouseByUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, user } = req;
    let rentalHouses;
    // If the user is an admin, fetch all listings
    if (user.role === "admin") {
        rentalHouses = new QueryBuilder_1.default(rentalHose_model_1.default.find().populate('landlordUser').populate("category", "_id name").setOptions({ strictPopulate: false }), query)
            .search(rentalHouse_constant_1.RentalHouseSearchableFields)
            .filter()
            .sort()
            .paginate()
            .fields();
    }
    else if (user.role === "landlord") {
        rentalHouses = new QueryBuilder_1.default(rentalHose_model_1.default.find({ landlordUser: user.userId }).populate('landlordUser').populate("category", "_id name").setOptions({ strictPopulate: false }), query)
            .search(rentalHouse_constant_1.RentalHouseSearchableFields)
            .filter()
            .sort()
            .paginate()
            .fields();
    }
    ;
    const result = yield (rentalHouses === null || rentalHouses === void 0 ? void 0 : rentalHouses.modelQuery.populate('User'));
    const meta = yield (rentalHouses === null || rentalHouses === void 0 ? void 0 : rentalHouses.countTotal());
    return {
        result,
        meta,
    };
});
const getRenTalHouseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rentalHouse = yield rentalHose_model_1.default.findById(id);
    return rentalHouse;
});
const updateRenTalHouseById = (houseId, payload, houseImages, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { images } = houseImages;
    const user = yield user_model_1.default.findById(authUser.userId);
    const house = yield rentalHose_model_1.default.findOne({ _id: houseId, landlordUser: authUser.userId });
    if (!(user === null || user === void 0 ? void 0 : user.isActive)) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User is not active');
    }
    if (!house) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'This Landlord House Not Found');
    }
    if (images && images.length > 0) {
        payload.images = images.map((image) => image.path);
    }
    return yield rentalHose_model_1.default.findByIdAndUpdate(houseId, payload, { new: true });
});
const deleteRenTalHouseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rentalHouse = yield rentalHose_model_1.default.findByIdAndDelete(id);
    yield rentalRequest_model_1.default.deleteMany({ listingId: id });
    return rentalHouse;
});
exports.RentalHouseServices = {
    createRentalHouse,
    getAllRentalHouse,
    getRenTalHouseById,
    updateRenTalHouseById,
    deleteRenTalHouseById,
    getAllHouseByUser
};
