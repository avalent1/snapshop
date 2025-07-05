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
exports.createProductWithAssets = createProductWithAssets;
const cloudinary_1 = require("cloudinary");
require("../config/cloudinary");
const database_1 = __importDefault(require("../config/database"));
const productModel_1 = require("../models/productModel");
const productImage_1 = require("../models/productImage");
const productSize_1 = require("../models/productSize");
function createProductWithAssets(data, imageFile) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.default.transaction((tx) => __awaiter(this, void 0, void 0, function* () {
            // 1. Upload to Cloudinary
            const uploadRes = yield cloudinary_1.v2.uploader.upload(imageFile.path, { folder: 'products' });
            // 2. Create Product
            const product = yield productModel_1.Product.create({
                name: data.name,
                description: data.description,
                price: data.price,
                category: data.category,
                subCategory: data.subCategory,
                bestseller: data.bestseller,
            }, { transaction: tx });
            // 3. Create ProductImage
            yield productImage_1.ProductImage.create({
                url: uploadRes.secure_url,
                publicId: uploadRes.public_id,
                productId: product.id,
            }, { transaction: tx });
            // 4. Create Sizes (if any)
            if (data.sizes && data.sizes.length) {
                const sizeRecords = data.sizes.map((size) => ({ productId: product.id, size }));
                yield productSize_1.ProductSize.bulkCreate(sizeRecords, { transaction: tx });
            }
            return product;
        }));
    });
}
