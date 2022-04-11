import { OrderStatus } from '../types/order-status';
import { Subjects } from './subject';
export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    status: OrderStatus.Created;
    userId: string;
    expiresAt: string;
    version: number;
    ticket: {
      id: string;
      title: string;
      price: number;
      userId: string;
    };
  };
}
