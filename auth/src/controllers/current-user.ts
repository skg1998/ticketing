const currentUser = (req: any, res: any) => {
  res.send({ currentUser: req.currentUser || null });
};

export default { currentUser };
