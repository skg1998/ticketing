import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

const signin = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //res.status(400).send(errors.array());
    throw new RequestValidationError(errors.array());
  }

  throw new DatabaseConnectionError();

  const { email, password } = req.body;
};

export default { signin };
