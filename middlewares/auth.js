const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { UnauthorizedErrorAnswer } = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const secretKey = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(UnauthorizedErrorAnswer));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : secretKey);
  } catch (err) {
    return next(new UnauthorizedError(UnauthorizedErrorAnswer));
  }

  req.user = payload;
  return next();
};
