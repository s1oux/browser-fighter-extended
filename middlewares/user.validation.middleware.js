// const { user } = require('../models/user');
const { validateUserInput } = require('../validation/user.validation');
const { getObjectValuesAsString } = require('../services/objectValues');

const createUserValid = (req, res, next) => {
  // TODO: Implement validation for user entity during creation
  const { errors, isValid } = validateUserInput(req.body);

  if (!isValid) {
    return res.status(400).json({
      error: true,
      message: getObjectValuesAsString(errors),
    });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validation for user entity during update

  const { errors, isValid } = validateUserInput(req.body);

  if (!isValid) {
    return res.status(400).json({
      error: true,
      message: getObjectValuesAsString(errors),
    });
  }

  next();
};

/**
 * Наличие полей
 * Формат полей:
 * firstName - notEmpty
 * lastName - notEmpty
 * email - only gmail
 * phoneNumber - +380xxxxxxxxx
 * password - length >= 3
 * Id в body запросов должен отсутствовать
 * Лишние поля не должны пройти в БД
 */

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
