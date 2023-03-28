const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});

  for (const user of helper.initialUsers) {
    const { name, username, password } = user;
    const passwordHash = await bcrypt.hash(password, 10);

    const userObject = new User({ name, username, passwordHash });
    await userObject.save();
  }
});

describe('when there is initially some users saved', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are 2 users', async () => {
    const response = await api.get('/api/users');

    expect(response.body).toHaveLength(helper.initialUsers.length);
  });

  test('a specific name is within the returned users', async () => {
    const response = await api.get('/api/users');

    const usernames = response.body.map((user) => user.name);

    expect(usernames).toContain('Alice Smith');
  });

  test('users have unique identifier property named id', async () => {
    const response = await api.get('/api/users');

    response.body.map((user) => expect(user.id).toBeDefined());
  });
});

describe('addition of a new user', () => {
  test('a valid user can be added', async () => {
    const newUser = {
      username: 'cta',
      name: 'Charlie Taylor',
      password: 'ctasecret',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(helper.initialUsers[0].username);
  });

  test('a user without username cannot be added', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'Charlie Taylor',
      password: 'ctasecret',
    };

    await api.post('/api/users').send(newUser).expect(400);

    expect(usersAtStart).toHaveLength(helper.initialUsers.length);
  });

  test('a user without name cannot be added', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'ctaylor',
      password: 'ctasecret',
    };

    await api.post('/api/users').send(newUser).expect(400);

    expect(usersAtStart).toHaveLength(helper.initialUsers.length);
  });

  test('a user without password cannot be added', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'ctaylor',
      name: 'Charlie Taylor',
    };

    await api.post('/api/users').send(newUser).expect(400);

    expect(usersAtStart).toHaveLength(helper.initialUsers.length);
  });

  test('creation fails if an username is already taken', async () => {
    await api.post('/api/users').send(helper.initialUsers[0]).expect(400);

    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });
});

afterAll(async () => await mongoose.connection.close());
