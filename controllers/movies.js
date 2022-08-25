// const user = require('../models/user');
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
  Movie.find({})
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

// module.exports.likeMovie = (req, res, next) => {
//   Movie.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true },
//   )
//     .then((movie) => {
//       if (!movie) {
//         next(new ErrorNotFound('Карточка с указанным _id не найдена.'));
//       } else {
//         res.send(movie);
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         next(
//           new ErrorBadRequest(
//             'Переданы некорректные данные для постановки/снятии лайка.',
//           ),
//         );
//       } else if (err.name === 'CastError') {
//         next(new ErrorBadRequest('Передан несуществующий _id карточки.'));
//       } else {
//         next(err);
//       }
//     });
// };

// module.exports.dislikeCard = (req, res, next) => {
//   Movie.findByIdAndUpdate(
//     req.params._id,
//     { $pull: { likes: req.user._id } },
//     { new: true },
//   )
//     .then((movie) => {
//       if (!movie) {
//         next(new ErrorNotFound('Карточка с указанным _id не найдена.'));
//       } else {
//         res.send(movie);
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         next(
//           new ErrorBadRequest(
//             'Переданы некорректные данные для постановки/снятии лайка.',
//           ),
//         );
//       } else if (err.name === 'CastError') {
//         next(new ErrorBadRequest('Передан несуществующий _id карточки.'));
//       } else {
//         next(err);
//       }
//     });
// };
