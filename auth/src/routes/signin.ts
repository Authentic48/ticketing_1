import { BadRequest, validationRequest } from '@authentic48/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { Password } from '../services/password';

const route = express.Router();

route.post(
  '/api/users/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),

    body('password').trim().notEmpty().withMessage('Password must be supplied'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequest('Invalid credentials');
    }

    const passwordsMatch = await Password.Compare(
      password,
      existingUser.password
    );

    if (!passwordsMatch) {
      throw new BadRequest('Invalid credentials');
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };

    res.status(200).json(existingUser);
  }
);

export { route as signIn };
