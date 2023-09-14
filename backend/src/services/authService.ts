import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user';

const SECRET_KEY = 'my-secret-key';
const expiresIn = '1h';

export function authenticateUser(username: string, password: string): string | null {
  const users: User[] = require('../../data/user.json');

  const user = users.find((user) => user.username === username);
  
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn,
    });
    console.log('token', token);
    return token;
  } else {
    return null;
  }
};

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
};

export function hashPassword(password: string): string {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};
