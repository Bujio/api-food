const User = require('../models/User.model');
const express = require('express');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const saltRounds = 10;

// POST /auth/signup - Create new user in db
router.post('/signup', (req, res, next) => {
  const { email, password, name, username } = req.body;

  // Check if the email or password or name or username is provided as an empty string
  if (name === '' || email === '' || password === '' || username === '') {
    res.status(400).json({
      message: 'You need to fill all fields of form ',
    });
    return;
  }
  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }
  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.',
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // If the email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create a new user in the database
      //We return a pending promise, which allows us to chain another 'then'
      return User.create({ name, password: hashedPassword, email, username });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user objetc to omit the password
      // We should never expose passwords publicly
      const { email, name, username, _id } = createdUser;

      //Create a new objetc that doesn't expose the password
      const user = { email, name, username, _id };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err));
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === '' || password === '') {
    res.status(400).json({ message: 'Provide email and password.' });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: 'User not found.' });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, name };

        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: '6h',
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: 'Unable to authenticate the user' });
      }
    })
    .catch((error) => next(error));
});

// GET /auth/verify
router.get('/verify', isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
});

module.exports = router;
