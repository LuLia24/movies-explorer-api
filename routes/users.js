const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUserById,

  setMe,
} = require('../controllers/users');

router.get('/users/me', getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
}), setMe);

module.exports = router;
