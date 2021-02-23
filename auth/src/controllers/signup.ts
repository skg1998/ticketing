import { Request, Response } from 'express';
import { User } from '../modals/user';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

const signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const existingUser = User.findOne({ email });

  if (existingUser) {
    console.log('Email is already in use');
    res.send({});
  }

  const user = new User({
    email: email,
    password: password,
  });
  await user.save();
  res.status(201).send(user);
};

export default { signup };
