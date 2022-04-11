import { Message } from 'node-nats-streaming';
import { Listener, TicketCreatedEvent, Subjects } from '@authentic48/common';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, price, title, userId, version } = data;

    const ticket = Ticket.build({
      id,
      price,
      title,
      userId,
    });

    await ticket.save();

    msg.ack();
  }
}
