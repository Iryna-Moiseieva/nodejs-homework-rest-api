const express = require("express");
const router = express.Router();
const contactsController  = require("../controllers/contacts");
const { tryCatchWrapper } = require("../helpers");
const { joiSchema, favoriteJoiSchema } = require("../models/contacts.js");
const {
  validateId,
  validationPost,
  validationUpdate,
  validationFavoriteUpdate
} = require("../middlewares");

router.get("/", tryCatchWrapper(contactsController.getAll));
router.get("/:id",
  validateId,
  tryCatchWrapper(contactsController.getById));

router.post("/",
  validationPost(joiSchema),
  tryCatchWrapper(contactsController.create));

router.put("/:id",
  validateId,
  validationUpdate(joiSchema),
  tryCatchWrapper(contactsController.putById)
);

router.patch(
  "/:id/favorite",
  validateId,
  validationFavoriteUpdate(favoriteJoiSchema),
  tryCatchWrapper(contactsController.updateFavorite)
);

router.delete("/:id",
  validateId,
  tryCatchWrapper(contactsController.deleteById));

module.exports = router;
