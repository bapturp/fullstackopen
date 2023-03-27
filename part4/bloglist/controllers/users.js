const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    author: 1,
    title: 1,
    url: 1,
    likes: 1,
  });

  response.json(users);
});

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({ username, name, passwordHash });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = userRouter;
