"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSize = void 0;
exports.associateProductSizeModels = associateProductSizeModels;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Product_1 = require("./Product");
class ProductSize extends sequelize_1.Model {
}
exports.ProductSize = ProductSize;
ProductSize.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    productId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    size: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, { sequelize: database_1.default, tableName: 'product_sizes' });
function associateProductSizeModels() {
    ProductSize.belongsTo(Product_1.Product, { foreignKey: 'productId' });
}
