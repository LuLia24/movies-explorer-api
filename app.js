const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routeAuthoriztion = require('./routes/authorization');
const routeUser = require('./routes/users');
const routeMovies = require('./routes/movies');
const errorHandler = require('./errors/errorHandler');
const ErrorNotFound = require('./errors/ErrorNotFound');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { PORT, BD_PATH } = require('./helpers/vars');

mongoose.connect(BD_PATH);

const app = express();

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routeAuthoriztion);
app.use(auth);

app.use(routeUser);
app.use(routeMovies);

app.use('/', () => {
  throw new ErrorNotFound('Путь не найден');
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {

});
