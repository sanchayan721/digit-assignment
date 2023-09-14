import { Request, Response } from 'express';
import { User } from '../models/user';
import { authenticateUser, hashPassword } from '../services/authService';
import { writeDataToJsonFile } from '../services/fsService';
const users: User[] = require('../../data/user.json');

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  // Authenticate the user
  const token = authenticateUser(username, password);

  if (token) {
    res.setHeader('Authorization', 'Bearer ' + token);
    res.json({ username, token });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

export const register = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    res.status(400).json({ message: 'Username is already in use' });
    return;
  }

  // Hash and salt the password
  const hashedPassword = hashPassword(password);

  const newUser: User = {
    id: String(users.length + 1),
    username,
    password: hashedPassword,
  };

  users.push(newUser);

  writeDataToJsonFile(users)
    .then(() => {
      res.status(201).json({ message: 'User registered successfully' });
    })
    .catch((error) => {
      console.error('Error writing data to JSON file:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
};
