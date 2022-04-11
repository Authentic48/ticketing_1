import { Subjects, PaymentCreatedEvent, Publisher } from '@authentic48/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
