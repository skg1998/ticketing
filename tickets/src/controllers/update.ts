import { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import {
  NotFoundError,
  NotAuthorizedError,
  BadRequestError,
} from '@ticketing-pro/common';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const updateTicket = async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }

  if (ticket.orderId) {
    throw new BadRequestError('Cannot edit a reserve ticket');
  }

  if (ticket.userId != req.currentUser?.id) {
    throw new NotAuthorizedError();
  }

  ticket.set({
    title: req.body.title,
    price: req.body.price,
  });

  await ticket.save();

  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    version: ticket.version,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
  });

  res.send(ticket);
};

export default { updateTicket };
