const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  });

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).send();
  }
});

blogsRouter.post('/', async (request, response) => {
  const { author, title, url } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    author,
    title,
    url,
    user: user.id,
  });

  const savedBlog = await blog.save();
  await savedBlog.populate('user', { username: 1, name: 1 });

  user.blogs = [...user.blogs, savedBlog.id];
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  });

  if (blog.user.id !== decodedToken.id) {
    return response.status(401).json({ error: 'invalid permission' });
  }

  await blog.deleteOne();
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  if (request.body.likes === undefined) {
    response.status(400).send({ error: 'likes value must be provided' });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    { new: true, runValidators: true, content: 'query' }
  );

  if (updatedBlog) {
    response.status(204).send(updatedBlog);
  } else {
    response.status(404).send();
  }
});

module.exports = blogsRouter;
