import express from 'express';
import signOutCtrl from '../controllers/signout';

const router = express.Router();

router.post('/api/users/signout', signOutCtrl.signout);

export { router as signoutRouter };
