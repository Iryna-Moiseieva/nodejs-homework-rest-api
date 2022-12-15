const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
const {
  Conflict,
  Unauthorized,
  Forbidden,
  BadRequest
} = require("http-errors");

require("dotenv").config();
const { SECRET_KEY } = process.env;
const { User } = require("../models/users");
const { sendEmail } = require("../helpers/sendEmail");


async function signup(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatar = gravatar.url(email);

  const verificationToken = nanoid();
  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL: avatar,
    verificationToken: verificationToken,
  });

  await sendEmail({ email, verificationToken });

  return res.status(201).json(newUser);
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw new Unauthorized("Email or password is wrong");
  }

  if (!user.verify) {
    throw Forbidden ( "Email not verify");
  }

  const { email: userEmail, subscription, _id } = user;

  const payload = {
    id: _id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate({ _id }, { token });

  return res.status(200).json({
    token,
    user: { email: userEmail, subscription },
  });
}

async function logout(req, res) {

  const { _id } = req.user;

  await User.findByIdAndUpdate({ _id }, { token: null });

  return res.status(204).json({ message: "Logout success" });

}

async function current(req, res) {
  const { email } = req.user;
  const user = await User.findOne({ email });
  const { subscription } = user;

  return res.status(200).json({
    user: {
      email,
      subscription,
    },
  });

}

async function updateAvatar(req, res) {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;

  const imageName = `${id}_${originalname}`;
  const avatarDir = path.join(__dirname, "../public/avatars");

  try {
    const resultUpload = path.join(avatarDir, imageName);

    Jimp
      .read(tempUpload)
      .then((image) => image.resize(250, 250).write(resultUpload))
      .catch((error) => console.log(error));

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);

    throw error;
  }

}

async function verifyEmail(req, res) {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  return res.status(200).json({message: "Verify email successfully",
  });
}

async function resendVerifyEmail(req, res, next) {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user.verify) {
    throw new BadRequest ("Verification has already been passed");
  }

  const verificationToken = nanoid();

  await User.findByIdAndUpdate(user._id, { verificationToken });
  await sendEmail({ email, verificationToken });

  return res.status(200).json({ message: "Verification email sent" });
}

module.exports = {
  signup,
  login,
  logout,
  current,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail
};