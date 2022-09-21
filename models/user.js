const mongoose = require('mongoose');
// const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,

  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value),
      message: 'Неправильный формат почты',
    },

  },
  password: {
    type: String,
    required: true,
    select: false,

  },
});

module.exports = mongoose.model('user', userSchema);
