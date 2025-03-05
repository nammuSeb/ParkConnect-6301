import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database.js';

class AuthService {
  async register(userData) {
    const connection = await pool.getConnection();
    try {
      const [existingUser] = await connection.query(
        'SELECT id FROM users WHERE email = ?',
        [userData.email]
      );

      if (existingUser.length > 0) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const userId = uuidv4();
      const verifyToken = uuidv4();

      await connection.query(
        `INSERT INTO users (id, email, password, firstName, lastName, phone, verifyToken)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, userData.email, hashedPassword, userData.firstName, userData.lastName, userData.phone, verifyToken]
      );

      return { userId, verifyToken };
    } finally {
      connection.release();
    }
  }

  async login(email, password) {
    const connection = await pool.getConnection();
    try {
      const [users] = await connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (users.length === 0) {
        throw new Error('Invalid credentials');
      }

      const user = users[0];
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      if (!user.isVerified) {
        throw new Error('Email not verified');
      }

      await connection.query(
        'UPDATE users SET lastLogin = NOW() WHERE id = ?',
        [user.id]
      );

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      };
    } finally {
      connection.release();
    }
  }

  async verifyEmail(token) {
    const connection = await pool.getConnection();
    try {
      const [users] = await connection.query(
        'SELECT id FROM users WHERE verifyToken = ?',
        [token]
      );

      if (users.length === 0) {
        throw new Error('Invalid verification token');
      }

      await connection.query(
        'UPDATE users SET isVerified = TRUE, verifyToken = NULL WHERE id = ?',
        [users[0].id]
      );

      return true;
    } finally {
      connection.release();
    }
  }
}

export default new AuthService();