require('dotenv').config();

const {
  NODE_ENV, JWT_SECRET, PORT = 3000, BD_PATH = 'mongodb://127.0.0.1:27017/moviesdb',
} = process.env;

const SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = {
  SECRET,
  PORT,
  BD_PATH,
};
