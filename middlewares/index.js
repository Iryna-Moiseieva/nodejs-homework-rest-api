const { isValidObjectId } = require("mongoose");
const { NotFound, BadRequest } = require("http-errors");

const validateId = (req, res, next) => {
  const { id } = req.params;
  const isValid = isValidObjectId(id);

  if (!isValid) {
    next(NotFound(`Contact with id: ${id} not found`));
    return;
  }
  next();
};

function validationPost(schema) {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest("Missing required fields");
    }
    next();
  };
}

const validationUpdate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest("Missing fields");
    }
    next();
  };
};

const validationFavoriteUpdate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequest("Missing fields favorite");
    }
    next();
  };
};


module.exports = {
  validateId,
  validationPost,
  validationUpdate,
  validationFavoriteUpdate
};
