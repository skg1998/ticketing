import express from 'express';
import { body } from 'express-validator';
import updateCtrl from '../controllers/update';
import { requireAuth } from '@ticketing-pro/common';
const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is Required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  updateCtrl.updateTicket
);

export { router as updateTicketRouter };
