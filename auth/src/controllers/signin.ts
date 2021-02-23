import { Request, Response } from 'express';

const signin = (req: Request, res: Response) => {
  res.send('Hi there!');
};

export default { signin };
