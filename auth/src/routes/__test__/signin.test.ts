import request from 'supertest';
import { app } from '../../app';

describe('POST /api/users/login', () => {
  it('returns a 400 on fail signin', async () => {
    return request(app)
      .post('/api/users/login')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(400);
  });

  it('returns a 400 on a missing password', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@test.com',
        password: '',
      })
      .expect(400);
  });

  it('returns a 400 on a missing email', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    await request(app)
      .post('/api/users/login')
      .send({
        email: '',
        password: 'password',
      })
      .expect(400);
  });

  it('returns a 200 with a cookie on a successful signin', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
