const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getAllMovies, deletMovieById, createMovie,
  // likeCard,
  //  dislikeCard,
} = require('../controllers/movies');

router.get('/', getAllMovies);

router.post('/', celebrate({
  body: Joi.object().keys({

    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/).required(),
    trailerLink: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/).required(),
    thumbnail: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }).unknown(true),

}), createMovie);

router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }).unknown(true),
}), deletMovieById);

// router.put('/:cardId/likes', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().hex().length(24),
//   }).unknown(true),
// }), likeCard);

// router.delete('/:cardId/likes', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().hex().length(24),
//   }).unknown(true),
// }), dislikeCard);

module.exports = router;
