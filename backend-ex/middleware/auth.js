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
exports.authenticate = exports.authUser1 = exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenHeader = req.headers.token;
    console.log(tokenHeader);
    if (!tokenHeader) {
        return res.json({ success: false, message: 'Not Authorized, Login Again' });
    }
    const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'string') {
            // This should never happen if you sign with an object payload
            return res.status(401).json({ success: false, message: 'Invalid token payload' });
        }
        // Now decoded is JwtPayload
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: 'Invalid token, Login Again' });
    }
});
exports.authUser = authUser;
const authUser1 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'string') {
            return res.status(401).json({ success: false, message: 'Invalid token payload' });
        }
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: 'Invalid token, Login Again' });
    }
});
exports.authUser1 = authUser1;
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
