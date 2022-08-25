const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUserById,
  // getAllUsers,
  // setAvatar,
  setMe,
} = require('../controllers/users');

router.get('/me', getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(2).max(30),
  }).unknown(true),
}), setMe);

// router.get('/', getAllUsers);

// router.get('/:userId', celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().hex().length(24),
//   }).unknown(true),
// }), getUserById);

// router.patch('/me/avatar', celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
//   }).unknown(true),
// }), setAvatar);

module.exports = router;
