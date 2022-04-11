import { Publisher, OrderCreatedEvent, Subjects } from '@authentic48/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
