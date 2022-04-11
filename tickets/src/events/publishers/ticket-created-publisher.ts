import { Publisher, TicketCreatedEvent, Subjects } from '@authentic48/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
