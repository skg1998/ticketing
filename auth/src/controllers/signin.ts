import { Request, Response } from 'express';
import { User } from '../modals/user';
import { BadRequestError } from '@ticketing-pro/common';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  console.log(existingUser);
  if (!existingUser) {
    throw new BadRequestError('Invalid Credentials');
  }

  const passwordMatch = await Password.compare(existingUser.password, password);
  if (!passwordMatch) {
    throw new BadRequestError('Invalid Credentials');
  }

  //Generate JWT
  const userJwt = jwt.sign(
    { id: existingUser.id, email: existingUser.email },
    process.env.JWT_KEY!
  );

  //Store it on session object
  req.session = { jwt: userJwt };

  res.status(201).send(existingUser);
};

export default { signin };
