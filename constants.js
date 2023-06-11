const urlPattern = /https?:\/\/(\www\.)?[1-9a-z\-.]{1,}\w\w(\/[1-90a-z.,_@%&?+=~/-]{1,}\/?)?#?/i;

const BadRequestErrorAnswer = 'Переданы некорректные данные';
const ConflictErrorAnswer = 'Пользователь с таким email уже существует';
const ForbiddenErrorAnswer = 'Вы не можете удалить этот фильм';
const NotFoundErrorAnswer = 'Пользователь с указанным id не найден';
const UnauthorizedErrorAnswer = 'Необходима авторизация';

module.exports = {
  urlPattern,
  BadRequestErrorAnswer,
  ConflictErrorAnswer,
  ForbiddenErrorAnswer,
  NotFoundErrorAnswer,
  UnauthorizedErrorAnswer,
};
