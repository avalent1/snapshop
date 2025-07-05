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
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleProduct = exports.removeProduct = exports.listProducts = exports.addProduct = void 0;
const productService_1 = require("../services/productService");
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, category, subCategory, bestseller, sizes, } = req.body;
        const imageFile = req.file;
        if (!imageFile) {
            return res.status(400).json({ success: false, message: 'Image is required' });
        }
        // Ensure sizes is parsed as array (could be sent as JSON string)
        const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
        const result = yield (0, productService_1.createProductWithAssets)({
            name,
            description,
            price: parseFloat(price),
            category,
            subCategory,
            bestseller: bestseller === 'true' || bestseller === true,
            sizes: parsedSizes,
        }, imageFile);
        res.status(201).json({
            success: true,
            productId: result.id,
            message: 'Product created successfully',
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Product creation failed' });
    }
});
exports.addProduct = addProduct;
const listProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.listProducts = listProducts;
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.removeProduct = removeProduct;
const singleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.singleProduct = singleProduct;
