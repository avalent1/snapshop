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
exports.deleteCartItem = exports.getCartItemsByUser = exports.updateCartItemQuantity = exports.insertCartItem = exports.incrementCartItemQuantity = exports.findCartItem = void 0;
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const findCartItem = (userId, productId, size) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield database_1.default.query(`SELECT * FROM cart_items WHERE user_id = :userId AND product_id = :productId AND size = :size`, {
        replacements: { userId, productId, size },
        type: sequelize_1.QueryTypes.SELECT,
    });
    return items[0] || null;
});
exports.findCartItem = findCartItem;
const incrementCartItemQuantity = (userId, productId, size) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.query(`UPDATE cart_items 
     SET quantity = quantity + 1 
     WHERE user_id = :userId AND product_id = :productId AND size = :size`, {
        replacements: { userId, productId, size },
        type: sequelize_1.QueryTypes.UPDATE,
    });
});
exports.incrementCartItemQuantity = incrementCartItemQuantity;
const insertCartItem = (userId, productId, size) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.query(`INSERT INTO cart_items (user_id, product_id, size, quantity)
     VALUES (:userId, :productId, :size, 1)`, {
        replacements: { userId, productId, size },
        type: sequelize_1.QueryTypes.INSERT,
    });
});
exports.insertCartItem = insertCartItem;
const updateCartItemQuantity = (userId, productId, size, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.query(`UPDATE cart_items
     SET quantity = :quantity
     WHERE user_id = :userId AND product_id = :productId AND size = :size`, {
        replacements: { userId, productId, size, quantity },
        type: sequelize_1.QueryTypes.UPDATE,
    });
});
exports.updateCartItemQuantity = updateCartItemQuantity;
const getCartItemsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.default.query(`select ci.id as id, ci.user_id as userId, ci.product_id as productId, ci.size, ci.quantity, p.price from cart_items ci join products p on ci.product_id=p.id where ci.user_id=:userId`, {
        replacements: { userId },
        type: sequelize_1.QueryTypes.SELECT,
    });
});
exports.getCartItemsByUser = getCartItemsByUser;
const deleteCartItem = (userId, productId, size) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.query(`DELETE FROM cart_items
     WHERE user_id = :userId AND product_id = :productId AND size = :size`, {
        replacements: { userId, productId, size },
        type: sequelize_1.QueryTypes.DELETE, // koristi odgovarajući QueryType
    });
});
exports.deleteCartItem = deleteCartItem;
