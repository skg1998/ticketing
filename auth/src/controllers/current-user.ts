import express from 'express';

const currentUser = (req: any, res: any) => {
  res.send('All users');
};

export default { currentUser };
