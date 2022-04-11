import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@authentic48/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
