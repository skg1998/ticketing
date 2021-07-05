import mongoose from 'mongoose';
import { app } from '../../app';
import request from 'supertest';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

it('return an error if ticket does not exist', async () => {
  const ticketId = mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId })
    .expect(404);
});

it('return a ticket if ticket already exist', async () => {
  const ticket = Ticket.build({
    title: 'concern',
    price: 20,
  });
  await ticket.save();

  const order = Order.build({
    ticket,
    userId: 'jfgstyuysdxfghmnr',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });

  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it('reserve a ticket', async () => {
  const ticket = Ticket.build({
    title: 'concern',
    price: 20,
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});
