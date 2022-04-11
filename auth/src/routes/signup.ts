import { BadRequest, validationRequest } from '@authentic48/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';

const route = express.Router();

route.post(
  '/api/users/register',
  [
    body('name').isString().notEmpty().withMessage('Name is invalid'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequest('User already exist');
    }

    const user = User.build({
      name,
      email,
      password,
    });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };

    res.status(201).json(user);
  }
);

export { route as signUp };
