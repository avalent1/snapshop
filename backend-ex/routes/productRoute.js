"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const productController_1 = require("../controllers/productController");
const productRouter = express_1.default.Router();
// Multer setup
const upload = (0, multer_1.default)({ dest: 'uploads/' }); // temporary folder for image uploads
// Helper to wrap async route handlers and forward errors to Express error handler
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
// Use upload.single('image') for image upload field
productRouter.post('/add', upload.single('image'), asyncHandler(productController_1.addProduct));
productRouter.post('/remove', asyncHandler(productController_1.removeProduct));
productRouter.post('/single', asyncHandler(productController_1.singleProduct));
productRouter.get('/list', productController_1.listProducts);
exports.default = productRouter;
