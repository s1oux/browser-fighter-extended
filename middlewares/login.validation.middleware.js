const { validateLoginInput } = require('../validation/login.validation');

const loginUserValid = (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json({
      error: true,
      message: errors,
    });
  }

  next();
};

exports.loginUserValid = loginUserValid;
