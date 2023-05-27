const { validateBody, validateUpdateFavorite } = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  validateBody,
  validateUpdateFavorite,
  isValidId,
  authenticate,
  upload,
};
