// import assert from 'assert';
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
      email: 'agentSmith@matrix.org'
    });

    const response = await supertest(app).get('/api/v1/users');
    console.log(response.body);
  });
});
