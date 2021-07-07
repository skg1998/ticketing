import { Subjects, Publisher, OrderCreatedEvent } from '@ticketing-pro/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
