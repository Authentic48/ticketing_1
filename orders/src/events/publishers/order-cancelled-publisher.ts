import { Publisher, OrderCancelledEvent, Subjects } from '@authentic48/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
