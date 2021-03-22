import { Request, Response } from 'express';
import { NotFoundError } from '@ticketing-pro/common';
import { Ticket } from '../models/ticket';

const showTicket = async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }
  res.send(ticket);
};

export default { showTicket };
