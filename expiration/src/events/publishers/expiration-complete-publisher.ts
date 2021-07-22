import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@ticketing-pro/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
