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
exports.fetchAllUsers = exports.adminLogin = exports.registerUser = exports.loginUser = void 0;
const userModel_1 = require("../models/userModel");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (id) => {
    if (!process.env.JWT_SECRET)
        throw new Error('JWT_SECRET is not defined');
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET);
};
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, userModel_1.findUserByEmail)(email);
        if (!user) {
            res.json({ success: false, message: 'User does not exist' });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password || '');
        if (isMatch) {
            const token = createToken(user.id); // assuming `id` instead of `userId`
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const exists = yield (0, userModel_1.findUserByEmail)(email);
        if (exists) {
            res.status(409).json({ success: false, message: 'User already exists' });
            return;
        }
        if (!validator_1.default.isEmail(email)) {
            res.json({ success: false, message: 'Please enter a valid email' });
            return;
        }
        if (password.length < 8) {
            res.json({ success: false, message: 'Please enter a strong password' });
            return;
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPass = yield bcrypt_1.default.hash(password, salt);
        const userId = yield (0, userModel_1.insertUser)(name, email, hashedPass);
        const token = createToken(userId);
        res.status(201).json({ success: true, message: 'User registered', userId, token });
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
});
exports.registerUser = registerUser;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(501).json({ message: 'Not implemented yet' });
});
exports.adminLogin = adminLogin;
const fetchAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userModel_1.getAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});
exports.fetchAllUsers = fetchAllUsers;
