const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../constants');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(urlPattern),
    trailerLink: Joi.string().regex(urlPattern),
    thumbnail: Joi.string().regex(urlPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().pattern(/^\d{1,}$/),
    // movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  createMovieValidation,
  movieIdValidation,
};
