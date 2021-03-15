import { Request, Response } from 'express';
import { User } from '../modals/user';
import { BadRequestError } from '@ticketing-pro/common';
import jwt from 'jsonwebtoken';

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email is already in use');
  }

  const user = new User({
    email: email,
    password: password,
  });

  //Generate JWT
  const userJwt = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY!
  );

  //Store it on session object
  req.session = { jwt: userJwt };

  await user.save();
  res.status(201).send(user);
};

export default { signup };
