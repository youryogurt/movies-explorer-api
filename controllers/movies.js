const Movie = require('../models/movie');

const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const { BadRequestErrorAnswer, ForbiddenErrorAnswer, NotFoundErrorAnswer } = require('../constants');

const getSavedMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movies) => res.status(201).send(movies))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            BadRequestErrorAnswer,
          ),
        );
      } else {
        next(err);
      }
    });
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie.findOne({ _id: movieId })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NotFoundErrorAnswer);
      }
      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError(ForbiddenErrorAnswer);
      }
      return Movie.deleteOne({ _id: movieId, owner: userId });
    })
    .then((deleteMovie) => {
      if (!deleteMovie) {
        throw new NotFoundError(NotFoundErrorAnswer);
      }
      res.send(deleteMovie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(BadRequestErrorAnswer));
      }
      return next(err);
    });
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovieById,
};
