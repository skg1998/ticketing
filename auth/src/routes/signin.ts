import express from 'express';
import signinCtrl from '../controllers/signin';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/users/signin', signinCtrl.signin);

export { router as signinRouter };
