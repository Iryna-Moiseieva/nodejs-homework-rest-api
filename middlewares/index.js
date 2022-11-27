const { BadRequest } = require("http-errors");

function validationBody(schema) {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest("Missing required fields");
    }
    next();
  };
}

function validationParams(schema) {
  return (req, _, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      throw new BadRequest("Wrong request parameter");
    }
    next();
  };
}

module.exports = {
  validationBody,
  validationParams
};
