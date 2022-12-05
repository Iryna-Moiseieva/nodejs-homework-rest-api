const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
});

const credentialsJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const verifyJoiSchema = Joi.object({
  verificationToken: Joi.string().required(),
});

const emailJoiSchema = Joi.object({
  email: Joi.string().email().required(),
});


const User = model("user", userSchema);

module.exports = {
  User,
  credentialsJoiSchema,
  verifyJoiSchema,
  emailJoiSchema
};