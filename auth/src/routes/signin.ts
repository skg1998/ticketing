import express from 'express';
import signinCtrl from '../controllers/signin';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valide'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 to 20 character'),
  ],
  signinCtrl.signin
);

export { router as signinRouter };
