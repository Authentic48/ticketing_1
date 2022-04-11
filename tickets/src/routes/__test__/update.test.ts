import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

describe('GET /api/tickets', () => {
  it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', global.signin())
      .send({
        title: 'this is our title',
        price: 15,
      })
      .expect(404);
  });

  it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
        title: 'this is our title',
        price: 15,
      })
      .expect(401);
  });

  it('returns a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
        title: 'this is our title',
        price: 15,
      });

    // await request(app)
    //   .put(`/api/tickets/${response.body.id}`)
    //   .set('Cookie', global.signin())
    //   .send({
    //     title: 'this is our updated title',
    //     price: 20,
    //   })
    //   .expect(401);
  });

  it('returns a 400 if the user provide invalid inputs', async () => {
    const cookie = global.signin();
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'this is our title',
        price: 15,
      });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: '',
        price: 20,
      })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: 'this is our updated title',
        price: -20,
      })
      .expect(400);
  });

  it('updates the ticket with valid inputs', async () => {
    const cookie = global.signin();
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'this is our title',
        price: 15,
      });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: 'this is our updated title',
        price: 20,
      })
      .expect(200);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send();

    expect(ticketResponse.body.price).toEqual(20);
  });

  it('publishes an event', async () => {
    const cookie = global.signin();
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'this is our title',
        price: 15,
      });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: 'this is our updated title',
        price: 20,
      })
      .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
