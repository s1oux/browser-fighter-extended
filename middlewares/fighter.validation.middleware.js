// const { fighter } = require('../models/fighter');
const { validateFighterInput } = require('../validation/fighter.validation');
const { getObjectValuesAsString } = require('../services/objectValues');

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during creation
  const { errors, isValid } = validateFighterInput(req.body);

  if (!isValid) {
    return res.status(400).json({
      error: true,
      message: getObjectValuesAsString(errors),
    });
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during update
  const { errors, isValid } = validateFighterInput(req.body);

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
 * name - not empty
 * health - > 1
 * power - >= 1 && < 100
 * defense - >= 1 && < 100
 * Id в body запросов должен отсутствовать
 * Лишние поля не должны пройти в БД
 */

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
