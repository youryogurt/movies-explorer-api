const express = require('express');

const {
  getSavedMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

const {
  createMovieValidation,
  movieIdValidation,
} = require('../validation/movies');

const router = express.Router();

router.get('/', getSavedMovies);
router.post('/', createMovieValidation, createMovie);
router.post('/', movieIdValidation, createMovie);
router.delete('/:movieId', movieIdValidation, deleteMovieById);

module.exports = router;
