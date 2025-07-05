"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    _id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    price: { type: sequelize_1.DataTypes.DECIMAL, allowNull: false },
    image: {
        // Sequelize doesn’t have an array-of-strings type for MySQL,
        // so you might store JSON:
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    },
    category: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    subCategory: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    sizes: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    bestseller: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
}, {
    sequelize: database_1.default,
    tableName: 'products'
});
