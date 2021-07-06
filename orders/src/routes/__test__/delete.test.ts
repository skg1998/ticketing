import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';

it('marks an orders as cancelled', async () => {
  // create a ticket with Ticket Model
  const ticket = await Ticket.build({
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const user = global.signin();

  //make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel an order
  await request(app)
    .post(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});
