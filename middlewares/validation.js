const { BadRequest } = require("http-errors");

function validationBody(schema) {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    next();
  };
}

function validationParams(schema) {
  return (req, _, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      throw new BadRequest(error.message);
    }
    next();
  };
}

module.exports = {
  validationBody,
  validationParams
};
