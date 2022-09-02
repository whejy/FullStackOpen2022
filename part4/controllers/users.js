const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

// Get all users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

// Create new user
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response.status(400).json({
      error: 'username and password fields required',
    });
  }

  if (username.length < 3) {
    return response.status(400).json({
      error: 'username must contain at least 3 characters',
    });
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: 'password must contain at least 3 characters',
    });
  }

  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    return response.status(400).json({
      error: 'username already exists',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
