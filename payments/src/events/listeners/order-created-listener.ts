import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from '@authentic48/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      status: OrderStatus.Created,
      version: data.version,
      userId: data.userId,
      price: data.ticket.price,
    });

    await order.save();

    msg.ack();
  }
}
