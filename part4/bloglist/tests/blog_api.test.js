const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of helper.initialUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10);
    user = { ...user, passwordHash };
    delete user.password;
    const userObject = new User(user);
    await userObject.save();
  }

  await Blog.deleteMany({});

  const user = await User.findOne({
    username: helper.initialUsers[0].username,
  });

  for (let blog of helper.initialBlogs) {
    blog.user = user._id;
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are 6 blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific title is within the returned blog titles', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((blog) => blog.title);

    expect(titles).toContain('React patterns');
  });

  test('blogs have an unique identifier property named id', async () => {
    const response = await api.get('/api/blogs');

    response.body.map((blogs) => expect(blogs.id).toBeDefined());
  });
});

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];
    blogToView.user.id = blogToView.user.id.toString();

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resultBlog.body).toEqual(blogToView);
  });

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId();
    await api.get(`/api/blogs/${validNonExistingId}`).expect(404);
  });

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = 'foo';
    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      author: 'Alice',
      title: 'I like flowers',
      url: 'http://aliceinwonderland.com',
    };

    const user = await User.findOne({});

    const token = helper.getToken(user);

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    // check number of blogs is the system is increased by one
    const blogAtEnd = await helper.blogsInDb();
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    // check that the title of blog is properly saved in db
    const titles = blogAtEnd.map((blog) => blog.title);
    expect(titles).toContain(helper.initialBlogs[0].title);
  });

  test('a blog created without likes property should default to 0', async () => {
    const newBlog = {
      author: 'David Bowie',
      title: 'Let all the children boogie',
      url: 'http://dbowie.com',
    };

    const user = await User.findOne({});

    const token = helper.getToken(user);

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogAtEnd = await helper.blogsInDb();
    const bowieBlog = blogAtEnd.find((blog) => blog.author === newBlog.author);

    expect(bowieBlog.likes).toEqual(0);
  });

  test('a blog without title cannot be added', async () => {
    const newBlog = {
      author: 'Djamil le Shlag',
      url: 'http://djamilleshlag.com/',
    };

    const user = await User.findOne({});

    const token = helper.getToken(user);

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(400);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a blog without url cannot be added', async () => {
    const newBlog = {
      author: 'Djamil le Shlag',
      title: '49.3, le dialogue a coup de matraque',
    };

    const user = await User.findOne({});

    const token = helper.getToken(user);

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(400);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const user = await User.findOne({
      username: helper.initialUsers[0].username,
    });

    const newBlog = {
      author: 'Alice',
      title: 'I like flowers',
      url: 'http://aliceinwonderland.com',
    };

    newBlog.user = user._id;

    const blog = new Blog(newBlog);
    await blog.save();

    const token = helper.getToken(user);

    await api
      .delete(`/api/blogs/${blog._id.toString()}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).not.toContain(newBlog.title);
  });

  test('fails with statuscode 400 if id is invalid', async () => {
    await api.delete('/api/blogs/foo').expect(400);
  });
});

describe('update a blog likes', () => {
  test('succeeds with status 204 if likes can be modified', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: blogToUpdate.likes + 1 })
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    const blogAtEnd = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);
    expect(blogAtEnd.likes).toEqual(blogToUpdate.likes + 1);
  });

  test('fails with statuscode 400 if id is invalid', async () => {
    await api.put('/api/blogs/foo').expect(400);
  });

  test('fails statuscode 404 if id does not exist', async () => {
    const invalidId = await helper.nonExistingId();

    await api.put(`/api/blogs/${invalidId}`).send({ likes: 1 }).expect(404);
  });

  test('fails if likes is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb();

    await api.put(`/api/blogs/${blogsAtStart[0].id}`).send({}).expect(400);
  });

  test('fails if likes is not a number', async () => {
    const blogsAtStart = await helper.blogsInDb();

    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .send({ likes: 'foo' })
      .expect(400);
  });
});

afterAll(async () => await mongoose.connection.close());
