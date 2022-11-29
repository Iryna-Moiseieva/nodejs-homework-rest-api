const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Conflict, Unauthorized } = require("http-errors");

require("dotenv").config();
const { SECRET_KEY } = process.env;
const { User } = require("../models/users");

async function signup(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashPassword });

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

module.exports = {
  signup,
  login,
  logout,
  current
};