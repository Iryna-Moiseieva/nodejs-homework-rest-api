const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { User } = require("../models/users");

require("dotenv").config();
const { SECRET_KEY } = process.env;

async function auth(req, res, next) {

try {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw new Unauthorized("Not authorized");
  }

  const { id } = jwt.verify(token, SECRET_KEY);
  const user = await User.findById(id);

  if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
  }

  req.user = user;
  next();
} catch (error) {
    next(new Unauthorized("Not authorized"));
  }
}

module.exports = {
  auth
};