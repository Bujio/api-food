const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    trim: true,
    min: 6,
  },
  image: {
    type: String,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png',
  },
  create: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = model('User', UserSchema);
