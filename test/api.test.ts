// import assert from 'assert';
import supertest from 'supertest';
import app from '../src/app';

const baseUrl = 'http://localhost:8000/api/v1';

describe('GET /users', () => {
  it('should get all database entries', async () => {
    const response = await supertest(app).get(`${baseUrl}/users`);
    console.log(response);
  });
});
