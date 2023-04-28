import User from '../models/User.js';
import { StatusCode } from 'http-status-codes';
import CustomError from '../errors';
import { hashPassword, comparePassword } from '../utils/password';

export const authController = {
  registerUser: async (req, res) => {
    const { firstName, lastName, email, password, type } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new CustomError.ConflictError('Email already registered');
    }

    // Hash the password and create the user
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      type
    });

    res.status(StatusCode.CREATED).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type
      }
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new CustomError.BadRequestError('Invalid email or password');
    }

    // Check the password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError.BadRequestError('Invalid email or password');
    }

    res.status(StatusCode.OK).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type  
      }
    });
  }
};
