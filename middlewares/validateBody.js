const { HttpError, extractFieldNameFromErrorMessage } = require("../helpers");

const validateAddBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        HttpError(
          400,
          `missing required ${extractFieldNameFromErrorMessage(
            error.message
          )} field`
        )
      );
    }
    next();
  };

  return func;
};

const validateUpdateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing fields"));
    }
    next();
  };

  return func;
};

const validateUpdateFavorite = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing field favorite"));
    }
    next();
  };

  return func;
};

module.exports = {
  validateAddBody,
  validateUpdateBody,
  validateUpdateFavorite,
};
