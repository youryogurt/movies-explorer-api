const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { login, createUser } = require('../controllers/users');
const { loginValidation, createUserValidation } = require('../validation/users');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
