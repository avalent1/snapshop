"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const productImage_1 = require("./productImage");
const productSize_1 = require("./productSize");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    price: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false },
    category: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    subCategory: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    bestseller: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
}, { sequelize: database_1.default,
    tableName: 'products',
    timestamps: true, });
Product.hasMany(productImage_1.ProductImage, { foreignKey: 'productId', as: 'images' });
Product.hasMany(productSize_1.ProductSize, { foreignKey: 'productId', as: 'sizes' });
