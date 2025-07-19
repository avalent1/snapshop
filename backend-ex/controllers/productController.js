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
const productModel_1 = require("../models/productModel");
const productImage_1 = require("../models/productImage");
const productSize_1 = require("../models/productSize");
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { name, description, price, category, subCategory, bestseller, sizes, } = req.body;
        const files = req.files;
        if (!((_a = files === null || files === void 0 ? void 0 : files.image1) === null || _a === void 0 ? void 0 : _a[0])) {
            return res.status(400).json({ success: false, message: 'Image is required' });
        }
        const uploadedImages = [(_b = files.image1) === null || _b === void 0 ? void 0 : _b[0], (_c = files.image2) === null || _c === void 0 ? void 0 : _c[0], (_d = files.image3) === null || _d === void 0 ? void 0 : _d[0]].filter(Boolean);
        // Ensure sizes is parsed as array (could be sent as JSON string)
        const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
        if (!parsedSizes || !Array.isArray(parsedSizes) || parsedSizes.length === 0) {
            return res.status(400).json({ success: false, message: 'At least one size is required.' });
        }
        const result = yield (0, productService_1.createProductWithAssets)({
            name,
            description,
            price: parseFloat(price),
            category,
            subCategory,
            bestseller: bestseller === 'true' || bestseller === true,
            sizes: parsedSizes,
        }, uploadedImages);
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
    try {
        const products = yield productModel_1.Product.findAll({
            include: [
                { model: productImage_1.ProductImage, as: 'images' },
                { model: productSize_1.ProductSize, as: 'sizes' },
            ],
        });
        res.json({ success: true, products });
    }
    catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Server error fetching products.' });
    }
});
exports.listProducts = listProducts;
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = Number(req.body.id); // or req.params.id if you prefer
        if (!productId || isNaN(productId)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        yield (0, productService_1.deleteProductById)(productId);
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Server error' });
    }
});
exports.removeProduct = removeProduct;
const singleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = Number(req.body.id); // or req.params.id if you want to pass id in URL
        if (!productId || isNaN(productId)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const product = yield productModel_1.Product.findByPk(productId, {
            include: [
                { model: productImage_1.ProductImage, as: 'images' },
                { model: productSize_1.ProductSize, as: 'sizes' },
            ],
        });
        if (!product) {
            return res.status(404);
        }
        res.json(product);
    }
    catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error fetching product' });
    }
});
exports.singleProduct = singleProduct;
