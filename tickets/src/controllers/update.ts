import { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError, NotAuthorizedError } from '@ticketing-pro/common';

const updateTicket = async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }

  if (ticket.userId != req.currentUser?.id) {
    throw new NotAuthorizedError();
  }

  ticket.set({
    title: req.body.title,
    price: req.body.price,
  });

  await ticket.save();

  res.send(ticket);
};

export default { updateTicket };
