const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.includes("Bearer")) {
      throw HttpError(401, "Not authorized");
    }

    const token = authHeader.split(" ")[1];
    const verify = jwt.verify(token, SECRET_KEY);
    if (!verify) {
      throw HttpError(401, "Not authorized");
    }

    const { id } = jwt.decode(token);
    const user = await User.findOne({ _id: id });
    if (user.token !== token) {
      throw HttpError(401, "Not authorized");
    }
  } catch {
    next(HttpError(401, "Not authorized"));
  }

  next();
};

module.exports = authentication;
