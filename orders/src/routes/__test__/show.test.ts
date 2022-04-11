import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';
import { OrderStatus } from '@authentic48/common';

describe('GET /api/orders', () => {
  it('fetches the order', async () => {
    //  create a ticket
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: 'concert',
      price: 20,
      userId: 'bdsajbygf',
    });
    await ticket.save();

    const user = global.signin();
    // Make a request to build orders for this ticket
    const { body: order } = await request(app)
      .post('/api/orders/')
      .set('Cookie', user)
      .send({
        ticketId: ticket.id,
      })
      .expect(201);

    // Make request to fetch the order
    const { body: fetchedOrder } = await request(app)
      .get(`/api/orders/${order.id}/`)
      .set('Cookie', user)
      .send()
      .expect(200);

    expect(fetchedOrder.id).toEqual(order.id);
  });

  it("returns an error if user try to error another user's orders", async () => {
    //  create a ticket
    const ticket = Ticket.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: 'concert',
      price: 20,
      userId: 'bdsajbygf',
    });
    await ticket.save();

    const user = global.signin();
    // Make a request to build orders for this ticket
    const { body: order } = await request(app)
      .post('/api/orders/')
      .set('Cookie', user)
      .send({
        ticketId: ticket.id,
      })
      .expect(201);

    // Make request to fetch the order
    const { body: fetchedOrder } = await request(app)
      .get(`/api/orders/${order.id}/`)
      .set('Cookie', global.signin())
      .send()
      .expect(401);
  });
});
