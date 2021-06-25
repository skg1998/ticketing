import { Publisher, Subjects, TicketCreatedEvent } from '@ticketing-pro/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
