import { OrderStatus } from '../types/order-status';
import { Subjects } from './subject';
export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    status: OrderStatus.Cancelled;
    version: number;
    ticket: {
      id: string;
    };
  };
}
