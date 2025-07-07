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
exports.getAllUsers = exports.insertUser = exports.findUserByEmail = void 0;
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.default.query('SELECT * FROM users WHERE email = ?', {
        replacements: [email],
        type: sequelize_1.QueryTypes.SELECT,
    });
    return users[0];
});
exports.findUserByEmail = findUserByEmail;
const insertUser = (name, email, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.default.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', {
        replacements: [name, email, hashedPassword],
        type: sequelize_1.QueryTypes.INSERT,
    });
    // result[0] is the insertId in MySQL
    return result[0]; // sequelize.query has a loose return type for INSERT
});
exports.insertUser = insertUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.default.query('SELECT id, name, email FROM users', {
        type: sequelize_1.QueryTypes.SELECT,
    });
    return users;
});
exports.getAllUsers = getAllUsers;
