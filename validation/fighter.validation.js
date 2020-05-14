const isEmpty = require('lodash.isempty');
const Validator = require('./validator');

const validateFighterInput = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.health = !isEmpty(data.health) ? data.health : '';
  data.power = !isEmpty(data.power) ? data.power : '';
  data.defense = !isEmpty(data.defense) ? data.defense : '';

  if (!Validator.containOnlyNecessaryFields(data, 4)) {
    errors.fields = 'Should contain only necessary fields';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Fighter Name is required';
  }

  if (Validator.isEmpty(data.health)) {
    errors.health = 'Health parameter is required';
  }

  if (!Validator.isAtLeast(data.health, 1)) {
    errors.health = 'Health paremeter should be at least 1';
  }

  if (!Validator.isNumber(data.health)) {
    errors.health = 'Health paremeter should be a number';
  }

  if (Validator.isEmpty(data.power)) {
    errors.power = 'Power parameter is required';
  }

  if (
    !Validator.isAtLeast(data.power, 1) ||
    !Validator.isLessThan(data.power, 10)
  ) {
    errors.power = 'Power paremeter should be in range [1, 9]';
  }

  if (!Validator.isNumber(data.power)) {
    errors.power = 'Power paremeter should be a number';
  }

  if (Validator.isEmpty(data.defense)) {
    errors.defense = 'Defense parameter is required';
  }

  if (
    !Validator.isAtLeast(data.defense, 1) ||
    !Validator.isLessThan(data.defense, 10)
  ) {
    errors.defense = 'Defense paremeter should be in range [1, 9]';
  }

  if (!Validator.isNumber(data.defense)) {
    errors.defense = 'Defense paremeter should be a number';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

exports.validateFighterInput = validateFighterInput;
