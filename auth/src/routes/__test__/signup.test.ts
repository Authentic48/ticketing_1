import request from 'supertest';
import { app } from '../../app';

describe('POST /api/users/register', () => {
  it('returns a 201 on successful signup', async () => {
    return request(app)
      .post('/api/users/register')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
  });

  it('returns a 400 on with an invalid email', async () => {
    return request(app)
      .post('/api/users/register')
      .send({
        name: 'test',
        email: 'test.com',
        password: 'password',
      })
      .expect(400);
  });

  it('returns a 400 on with an invalid password', async () => {
    return request(app)
      .post('/api/users/register')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: '123',
      })
      .expect(400);
  });

  it('returns a 400 on with missing name, email and password', async () => {
    return request(app).post('/api/users/register').send({}).expect(400);
  });
});
