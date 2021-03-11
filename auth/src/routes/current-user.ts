import express from 'express';
import currentUserCtrl from '../controllers/current-user';
import { currentUser } from '../middleware/current-user';
import { requireAuth } from '../middleware/require-auth';

const router = express.Router();

router.get(
  'api/users/currentuser',
  currentUser,
  requireAuth,
  currentUserCtrl.currentUser
);

export { router as currentUserRouter };
