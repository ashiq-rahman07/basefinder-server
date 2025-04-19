"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_routes_1 = require("../modules/auth/auth.routes");
const rentalHouse_route_1 = require("../modules/rentalHouses/rentalHouse.route");
const rentalRequest_router_1 = require("../modules/rentalRequest/rentalRequest.router");
const category_routes_1 = require("../modules/category/category.routes");
const rentpay_route_1 = require("../modules/rentPayment/rentpay.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/rental-house',
        route: rentalHouse_route_1.RentalHouseRoutes,
    },
    {
        path: '/rental-request',
        route: rentalRequest_router_1.RentalRequestRoutes,
    },
    {
        path: '/category',
        route: category_routes_1.CategoryRoutes,
    },
    {
        path: '/rent-pay',
        route: rentpay_route_1.PaymentRouter,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
