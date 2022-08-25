require('dotenv').config();

const { NODE_ENV, JWT_SECRET, PORT = 3000 } = process.env;

const SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = {
  SECRET,
  PORT,
};
