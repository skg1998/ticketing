import { TicketUpdatedEvents } from '@ticketing-pro/common';
import { Message } from 'node-nats-streaming';
import { TicketUpdatedListener } from '../ticket-updated-listeners';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // create and save ticket
  const ticket = await Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 10,
  });

  await ticket.save();

  // create a fake data
  const data: TicketUpdatedEvents['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: ticket.version + 1,
    title: 'new concert',
    price: 999,
    userId: 'xfnghjjyfsd',
  };

  //create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, ticket };
};

it('finds, update and save tickets', async () => {
  const { listener, data, msg, ticket } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertion to make sure that ticket was created
  const updateTicket = await Ticket.findById(ticket.id);

  expect(updateTicket).toBeDefined();
  expect(updateTicket!.title).toEqual(data.title);
  expect(updateTicket!.price).toEqual(data.price);
  expect(updateTicket!.version).toEqual(data.version);
});

it('acks the function', async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertion to make sure that acks the function
  expect(msg.ack).toHaveBeenCalled();
});
