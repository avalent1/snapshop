"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImage = void 0;
exports.associateProductImageModels = associateProductImageModels;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const product_1 = require("./product");
class ProductImage extends sequelize_1.Model {
}
exports.ProductImage = ProductImage;
ProductImage.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    url: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    publicId: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    productId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, { sequelize: database_1.default, tableName: 'product_images' });
function associateProductImageModels() {
    ProductImage.belongsTo(product_1.Product, { foreignKey: 'productId' });
}
