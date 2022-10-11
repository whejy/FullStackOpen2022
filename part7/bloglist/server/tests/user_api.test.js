const mongoose = require('mongoose');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const api = supertest(app);

describe('when there is intially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with new username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'jsmith',
      name: 'John Smith',
      password: 'tester123',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with status 400 if username too short', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'tr',
      password: 'hdahgrasdb',
      name: 'erty',
    };

    const result = await api.post('/api/users').send(newUser).expect(400);

    expect(result.body.error).toContain(
      'username must contain at least 3 characters'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with status 400 if password too short', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'user17',
      name: 'Ben Brown',
      password: '12',
    };

    const result = await api.post('/api/users').send(newUser).expect(400);

    expect(result.body.error).toContain(
      'password must contain at least 3 characters'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with status 400 if username already exists', async () => {
    const usersAtStart = await helper.usersInDb();

    const existingUser = {
      username: 'root',
      name: 'SuperUser',
      password: '25gasga',
    };

    const result = await api.post('/api/users').send(existingUser).expect(400);
    expect(result.body.error).toContain('username already exists');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
