import request from 'supertest';
import app from '../app';

describe('GET', () => {
  it('should return entries', async () => {
    const response = await request(app).get('/users');
    console.log('RESP', response.body);
  })
})
