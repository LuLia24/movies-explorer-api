const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const routeUser = require('./routes/users');
const routeMovies = require('./routes/movies');
const errorHandler = require('./errors/errorHandler');
const ErrorNotFound = require('./errors/ErrorNotFound');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { PORT } = require('./helpers/vars');

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb');

const app = express();

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }).unknown(true),
  }),
  login,
);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),

  }).unknown(true),
}), createUser);

app.use(auth);

app.use('/users', routeUser);
app.use('/movies', routeMovies);

app.use('/', () => {
  throw new ErrorNotFound('Путь не найден');
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {

});
