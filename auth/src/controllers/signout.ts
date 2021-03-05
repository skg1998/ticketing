const signout = (req: any, res: any) => {
  req.session = null;
  res.send({});
};

export default { signout };
