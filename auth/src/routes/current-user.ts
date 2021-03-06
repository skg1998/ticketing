import express from 'express';
import currentUserCtrl from '../controllers/current-user';
import { currentUser, requireAuth } from '@ticketing-pro/common';

const router = express.Router();

router.get(
  'api/users/currentuser',
  currentUser,
  requireAuth,
  currentUserCtrl.currentUser
);

export { router as currentUserRouter };
