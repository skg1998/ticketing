import { Listener, OrderCreatedEvent, Subjects } from '@ticketing-pro/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the ticket that the order is reserveing
    const ticket = await Ticket.findById(data.ticket.id);

    // if no ticket , throw error
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // Marks the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });

    // Save the tickets
    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    // ack the message
    msg.ack();
  }
}
