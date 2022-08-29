const Movie = require('../models/movie');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const Forbidden = require('../errors/Forbidden');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new ErrorBadRequest(
            'Переданы некорректные данные при создании карточки.',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
};

module.exports.deletMovieById = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        return next(new ErrorNotFound('Передан несуществующий _id фильма'));
      }

      if (movie.owner.toString() === req.user._id) {
        return Movie.findByIdAndRemove(movie._id);
      }
      return next(new Forbidden('Эта запись фильма создана не вами'));
    })
    .then((movie) => {
      if (movie) {
        res.send(movie);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Фильм с указанным _id не найден.'));
      } else {
        next(err);
      }
    });
};
