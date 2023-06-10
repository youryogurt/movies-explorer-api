const { celebrate, Joi } = require('celebrate');
const urlPattern = require('../constants');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlPattern),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  createMovieValidation,
  movieIdValidation,
};
