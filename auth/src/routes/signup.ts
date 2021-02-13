import express from 'express';
import signUpCtrl from '../controllers/signup';

const router = express.Router();

router.post('/api/users/signup', signUpCtrl.signup);

export { router as signupRouter };
