import { Subjects } from './subjects';

export interface TicketUpdatedEvents {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
