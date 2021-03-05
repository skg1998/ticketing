import jwt from 'jsonwebtoken';

const currentUser = (req: any, res: any) => {
  if (!req.session?.jwt) {
    res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (err) {
    res.send({ currentUser: null });
  }
};

export default { currentUser };
