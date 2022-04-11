import { Publisher, TicketUpdatedEvent, Subjects } from '@authentic48/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
