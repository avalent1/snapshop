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
exports.getUserCart = exports.updateCart = exports.addToCart = void 0;
const cartModel_1 = require("../models/cartModel");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, itemId, size } = req.body;
        const existingItem = yield (0, cartModel_1.findCartItem)(userId, itemId, size);
        if (existingItem) {
            yield (0, cartModel_1.incrementCartItemQuantity)(userId, itemId, size);
            return res.json({ message: 'Quantity updated.' });
        }
        else {
            yield (0, cartModel_1.insertCartItem)(userId, itemId, size);
            return res.json({ message: 'Item added to cart.' });
        }
    }
    catch (error) {
        console.error('Error in addToCart:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.addToCart = addToCart;
const updateCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const existingItem = yield (0, cartModel_1.findCartItem)(userId, itemId, size);
        if (!existingItem) {
            return res.status(404).json({ error: 'Item not found in cart.' });
        }
        yield (0, cartModel_1.updateCartItemQuantity)(userId, itemId, size, quantity);
        return res.json({ message: 'Quantity updated successfully.' });
    }
    catch (error) {
        console.error('Error in updateCart:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.updateCart = updateCart;
const getUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid userId parameter.' });
        }
        const cartItems = yield (0, cartModel_1.getCartItemsByUser)(userId);
        return res.json({ cart: cartItems });
    }
    catch (error) {
        console.error('Error in getUserCart:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getUserCart = getUserCart;
