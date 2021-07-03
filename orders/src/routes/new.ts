import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import {
  requireAuth,
  NotFoundError,
  BadRequestError,
  validateRequest,
} from '@ticketing-pro/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be Provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // Find the ticket that user is trying to order in database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }
    // Make sure that this ticket is not allready reserve
    //Run query to look at all orders. Find an order
    // where the ticket is ticket we just found and order status is not cancelled.
    // if we find an order from that means the ticket is reserved.
    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError('Ticket is Already reserve...');
    }
    //Calculate an expiration date for this order

    // Build the order and save it to database

    // Publish an event saying that order was created

    res.send({});
  }
);

export { router as newOrderRouter };
