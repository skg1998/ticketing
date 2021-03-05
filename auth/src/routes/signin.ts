import express from 'express';
import signinCtrl from '../controllers/signin';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate-request';
const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password is compulsory'),
  ],
  validateRequest,
  signinCtrl.signin
);

export { router as signinRouter };
