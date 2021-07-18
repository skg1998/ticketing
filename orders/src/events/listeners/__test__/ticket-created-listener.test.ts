import { TicketCreatedEvent } from '@ticketing-pro/common';
import { Message } from 'node-nats-streaming';
import { TicketCreatedListener } from '../ticket-created-listeners';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  const listener = new TicketCreatedListener(natsWrapper.client);

  // create a fake data
  const data: TicketCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: 'concert',
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  //create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('create and save tickets', async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertion to make sure that ticket was created
  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it('acks the function', async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertion to make sure that acks the function
  expect(msg.ack).toHaveBeenCalled();
});
