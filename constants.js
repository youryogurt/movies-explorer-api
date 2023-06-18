const urlPattern = /https?:\/\/(\www\.)?[1-9a-z\-.]{1,}\w\w(\/[1-90a-z.,_@%&?+=~/-]{1,}\/?)?#?/i;

const BadRequestErrorAnswer = 'Переданы некорректные данные';
const ConflictErrorAnswer = 'Возник конфликт запроса с текущим состоянием целевого ресурса';
const ForbiddenErrorAnswer = 'У вас нет доступа для совершения этого действия';
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
