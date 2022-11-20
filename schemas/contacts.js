const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z ]+$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]+-[0-9]+-[0-9]+$/, "numbers")
    .required(),
});

module.exports = {
  contactSchema
};