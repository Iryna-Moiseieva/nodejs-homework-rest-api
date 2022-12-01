const express = require("express");
const router = express.Router();

const usersController  = require("../controllers/users");
const { validationBody }  = require("../middlewares/validation");
const { auth } = require("../middlewares/auth");
const { tryCatchWrapper } = require("../helpers");
const { credentialsJoiSchema} = require("../models/users");

router.post("/signup",
  validationBody(credentialsJoiSchema),
  tryCatchWrapper(usersController.signup));

router.post("/login",
  validationBody(credentialsJoiSchema),
  tryCatchWrapper(usersController.login));

router.get("/logout",
  auth,
  tryCatchWrapper(usersController.logout));

router.get("/current",
  auth,
  tryCatchWrapper(usersController.current));

module.exports = router;