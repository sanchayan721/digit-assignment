"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const authService_1 = require("@services/authService");
const users = require('../../data/user.json');
const login = (req, res) => {
    const { username, password } = req.body;
    // Authenticate the user
    const token = (0, authService_1.authenticateUser)(username, password);
    if (token) {
        res.json({ token });
    }
    else {
        res.status(401).json({ message: 'Authentication failed' });
    }
};
exports.login = login;
const register = (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        res.status(400).json({ message: 'Username is already in use' });
        return;
    }
    // Hash and salt the password
    const hashedPassword = (0, authService_1.hashPassword)(password);
    const newUser = {
        id: String(users.length + 1),
        username,
        password: hashedPassword,
    };
    users.push(newUser);
    // Return a success response
    res.status(201).json({ message: 'User registered successfully' });
};
exports.register = register;
