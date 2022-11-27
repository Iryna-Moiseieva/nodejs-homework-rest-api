const express = require("express");
const router = express.Router();
const contactsController  = require("../controllers/contacts");
const { tryCatchWrapper } = require("../helpers");
const {
  joiSchema,
  idJoiSchema,
  favoriteJoiSchema } = require("../models/contacts.js");
const {
  validationBody,
  validationParams
} = require("../middlewares");

router.get("/", tryCatchWrapper(contactsController.getAll));
router.get("/:id",
  validationParams(idJoiSchema),
  tryCatchWrapper(contactsController.getById));

router.post("/",
  validationBody(joiSchema),
  tryCatchWrapper(contactsController.create));

router.put("/:id",
  validationParams(idJoiSchema),
  validationBody(joiSchema),
  tryCatchWrapper(contactsController.putById)
);

router.patch(
  "/:id/favorite",
  validationParams(idJoiSchema),
  validationBody(favoriteJoiSchema),
  tryCatchWrapper(contactsController.updateFavorite)
);

router.delete("/:id",
  validationParams(idJoiSchema),
  tryCatchWrapper(contactsController.deleteById));

module.exports = router;
