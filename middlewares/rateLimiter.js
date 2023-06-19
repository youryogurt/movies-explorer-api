const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимальное количество запросов
  message: 'Превышен лимит запросов. Пожалуйста, повторите попытку позже.',
});

module.exports = limiter;
