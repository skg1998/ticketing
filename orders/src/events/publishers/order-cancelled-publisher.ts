import {
  Publisher,
  Subjects,
  OrderCancelledEvent,
} from '@ticketing-pro/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
