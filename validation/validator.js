class Validator {
  isEmpty = (value) => {
    return value === '' ? true : false;
  };

  isNumber = (value) => {
    return /^\d+$/g.test(value);
  };

  isAtLeast = (value, min) => {
    return Number(value) >= min;
  };

  isLessThan = (value, max) => {
    return Number(value) < max;
  };

  isEmail = (value) => {
    return /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/gi.test(value);
  };

  isPhoneNumber = (value) => {
    return /^\+?3?8?(0\d{9})$/g.test(value);
  };

  isLength = (value, { min, max }) => {
    if (min) {
      if (max) {
        return value.length >= min && value.lenght < max;
      }
      return value.length >= min;
    }
  };
}

module.exports = new Validator();
