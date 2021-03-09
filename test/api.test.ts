import assert from 'assert';
import supertest from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import userModel from '../src/models/userModel';

beforeEach((done) => {
  mongoose.connect("mongodb://localhost:27017/TestDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

describe('GET /users', () => {
  it('should get all database entries', async () => {
    await userModel.create({
      firstName: 'Agent',
      lastName: 'Smith',
      email: 'agentsmith@matrix.org'
    }, {
      firstName: 'Agent2',
      lastName: 'Smith2',
      email: 'agentsmith2@matrix.org'});

    const response = await supertest(app).get('/api/v1/users');

    assert.ok(response);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.header['x-total-count'], '2');
    assert.strictEqual(response.body[0].firstName, 'Agent2');
    assert.strictEqual(response.body.length, 2);
  });

  it('should return database entry by :id', async () => {
    await userModel.create({
      firstName: 'Agent',
      lastName: 'Smith',
      email: 'agentsmith@matrix.org'
    });

    const { body } = await supertest(app).get('/api/v1/users');
    const userId = body[0]._id;
    const user = await supertest(app).get(`/api/v1/users/${userId}`);

    assert.strictEqual(user.body.lastName, 'Smith');
  });

  it('should return 404 error if database entry id does not exist', async () => {
    await userModel.create({
      firstName: 'Agent',
      lastName: 'Smith',
      email: 'agentsmith@matrix.org'
    });
    
    const { body } = await supertest(app).get('/api/v1/users/6047892981dbd56f9327a6c0');
    assert.ok(body.error);
    assert.strictEqual(body.error.errno, 404);
  });

  it('should return 404 error if there are no database entries', async () => {
    const { body } = await supertest(app).get('/api/v1/users');

    assert.strictEqual(body.error.errno, 404);
    assert.strictEqual(body.message, 'No users were found');
  })
});
