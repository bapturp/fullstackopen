const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are 6 blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(6);
});

test('the first blog is about React patterns', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].title).toBe('React patterns');
});

test('blogs have an unique identifier property named id', async () => {
  const response = await api.get('/api/blogs');

  response.body.map((blogs) => expect(blogs.id).toBeDefined());
});

test('a valid blog can be added', async () => {
  const newBlog = {
    author: 'Alice',
    title: 'I like flowers',
    url: 'http://aliceinwonderland.com',
  };

  await api
    .post('/api/blogs')
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

// 4.12
// test('a blog without title cannot be added', async () => {});

afterAll(async () => await mongoose.connection.close());
