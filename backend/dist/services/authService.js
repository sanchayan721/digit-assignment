"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.verifyToken = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SECRET_KEY = 'your-secret-key';
const expiresIn = '1h';
function authenticateUser(username, password) {
    const users = require('../data/users.json');
    const user = users.find((u) => u.username === username);
    if (user && bcrypt_1.default.compareSync(password, user.password)) {
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, SECRET_KEY, {
            expiresIn,
        });
        return token;
    }
    else {
        return null;
    }
}
exports.authenticateUser = authenticateUser;
;
function verifyToken(token) {
    try {
        jsonwebtoken_1.default.verify(token, SECRET_KEY);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.verifyToken = verifyToken;
;
function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt_1.default.hashSync(password, saltRounds);
}
exports.hashPassword = hashPassword;
;
