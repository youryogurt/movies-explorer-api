const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const secretKey = require('../config');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const { BadRequestErrorAnswer, NotFoundErrorAnswer, ConflictErrorAnswer } = require('../constants');

const updateUserProfile = (req, res, next) => {
  const { email, name } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NotFoundError('NotFoundErrorAnswer'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BadRequestErrorAnswer));
      } else {
        next(err);
      }
    });
};

const getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NotFoundError(NotFoundErrorAnswer));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email, name, password,
  } = req.body;
  // console.log(req.body);
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))
    .then(() => res.status(201).send(
      {
        email, name,
      },
    ))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BadRequestErrorAnswer));
      } else if (err.code === 11000) {
        next(new ConflictError(ConflictErrorAnswer));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : secretKey,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  updateUserProfile,
  getCurrentUserInfo,
  createUser,
  login,
};
