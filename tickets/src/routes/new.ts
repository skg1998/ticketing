import express from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@ticketing-pro/common';
import createTicketctrl from '../controllers/new';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .not()
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than zero'),
  ],
  validateRequest,
  createTicketctrl.createTicket
);

export { router as createTicketRouter };
