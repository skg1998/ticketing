import {
  Publisher,
  Subjects,
  TicketUpdatedEvents,
} from '@ticketing-pro/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvents> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
