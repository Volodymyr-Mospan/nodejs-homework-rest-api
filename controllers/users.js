const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "23h" });

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    token,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "23h" });
  const result = await User.findByIdAndUpdate(
    user._id,
    { token: token },
    { new: true }
  );

  res.status(200).json({
    token: token,
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
