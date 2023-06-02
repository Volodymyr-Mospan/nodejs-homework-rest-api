const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../models/user");
const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");
const { nanoid } = require("nanoid");
const { SECRET_KEY } = process.env;
const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const vereficationEmail = {
    to: email,
    subject: "Test mail",
    html: `<a href='http://localhost:3000/users/verify/${verificationToken}'>Verify your email</a>`,
  };

  sendEmail(vereficationEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, `Not found`);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.status(200).json({
    message: "Verification successful",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "23h" });
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { token: token },
    { new: true }
  );

  res.status(200).json({
    token: updatedUser.token,
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email: email,
    subscription: subscription,
  });
};

const subscriptionUpdate = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(
    { _id },
    { subscription },
    { new: true }
  );

  res.status(200).json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  await Jimp.read(tempUpload)
    .then((image) => {
      return image.contain(250, 250).write(tempUpload);
    })
    .catch((err) => {
      console.error(err);
    });

  const newFileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, newFileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatar", newFileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  subscriptionUpdate: ctrlWrapper(subscriptionUpdate),
  updateAvatar: ctrlWrapper(updateAvatar),
};
