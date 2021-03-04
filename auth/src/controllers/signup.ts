import { Request, Response } from 'express';
import { User } from '../modals/user';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

const signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const existingUser = User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email is already in use');
  }

  const user = new User({
    email: email,
    password: password,
  });

  //Generate JWT
  const userJwt = jwt.sign({ id: user.id, email: user.email }, 'asdf');

  //Store it on session object
  req.session = { jwt: userJwt };

  await user.save();
  res.status(201).send(user);
};

export default { signup };
