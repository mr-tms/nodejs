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

const createDbEntry = async () => {
  await userModel.create({
    firstName: 'Agent',
    lastName: 'Smith',
    email: 'agentsmith@matrix.org'
  }, {
    firstName: 'Agent2',
    lastName: 'Smith2',
    email: 'agentsmith2@matrix.org'});
};

describe('GET /users', () => {
  it('should get all database entries', async () => {
    await createDbEntry();

    const response = await supertest(app).get('/api/v1/users');

    assert.ok(response);
    assert(response.status, '200');
    assert(response.header['x-total-count'], '2');
    assert(response.body[0].firstName, 'Agent');
    assert(response.body.length, '2');
  });

  it('should return database entry by :id', async () => {
    await createDbEntry();

    const { body } = await supertest(app).get('/api/v1/users');
    const userId = body[0]._id;
    const user = await supertest(app).get(`/api/v1/users/${userId}`);

    assert(user.body.lastName, 'Smith');
  });

  it('should return 404 error if database entry id does not exist', async () => {
    await createDbEntry();
    
    const { body } = await supertest(app).get('/api/v1/users/6047892981dbd56f9327a6c0');
    assert.ok(body.error);
    assert(body.error.errno, '404');
  });

  it('should return 404 error if there are no database entries', async () => {
    const { body } = await supertest(app).get('/api/v1/users');

    assert(body.error.errno, '404');
    assert(body.message, 'No users were found');
  })
});

describe('POST /users', () => {
  it('should create new database entry', async () => {
    const response = await supertest(app)
      .post('/api/v1/users')
      .send({
        'firstName': 'Agent',
        'familyName': 'Smith',
        'email': 'agentsmith3@matrix.org'
      });

    assert(response.status, '201');
    assert.ok(typeof response.headers.location === 'string');
  });

  it('should throw validation error for missing first name and email', async () => {
    const response = await supertest(app)
      .post('/api/v1/users')
      .send({});
    
    assert(response.status, '500');
    assert(
      response.body.error.message,
      'User validation failed: email: Please provide your email, firstName: Path `firstName` is required.'
    );
  });
});

describe('DELETE /users', () => {
  it('should delete database entry by id', async () => {
    await createDbEntry();

    const { body } = await supertest(app).get('/api/v1/users');
    const userId = body[0]._id;
    const { status } = await supertest(app).delete(`/api/v1/users/${userId}`);

    assert(status, '204');
  });
});
