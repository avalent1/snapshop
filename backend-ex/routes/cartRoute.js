"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const auth_1 = require("../middleware/auth");
const cartRouter = express_1.default.Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
cartRouter.post('/get', asyncHandler(auth_1.authUser1), asyncHandler(cartController_1.getUserCart));
cartRouter.post('/add', asyncHandler(auth_1.authUser), asyncHandler(cartController_1.addToCart));
cartRouter.post('/update', asyncHandler(auth_1.authUser), asyncHandler(cartController_1.updateCart));
cartRouter.delete('/remove', asyncHandler(auth_1.authUser), asyncHandler(cartController_1.removeFromCart));
exports.default = cartRouter;
