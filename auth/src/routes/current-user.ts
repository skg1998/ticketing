import express from 'express';
import currentUserCtrl from '../controllers/current-user';

const router = express.Router();

router.get('api/users/currentuser', currentUserCtrl.currentUser);

export { router as currentUserRouter };
