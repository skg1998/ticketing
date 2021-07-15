import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';

const buildTicket = async () => {
  const ticket = await Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();
  return ticket;
};

it('fetches order for a particular user', async () => {
  // Create three Ticket
  const ticketone = await buildTicket();
  const tickettwo = await buildTicket();
  const ticketthree = await buildTicket();

  const userOne = global.signin();
  const userTwo = global.signin();

  // Create one order as User #1
  await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticketone.id })
    .expect(201);

  // Create two order as user #2
  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ ticketId: tickettwo.id })
    .expect(201);

  const { body: orderTwo } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ ticketId: ticketthree.id })
    .expect(201);

  // Make request to get orders for users #2
  const response = await request(app).get('/api/orders').set('Cookie', userTwo);

  // Make sure to only got the orders for users #2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderOne.id);
  expect(response.body[1].id).toEqual(orderTwo.id);
  expect(response.body[0].ticket.id).toEqual(tickettwo.id);
  expect(response.body[1].ticket.id).toEqual(ticketthree.id);
});
