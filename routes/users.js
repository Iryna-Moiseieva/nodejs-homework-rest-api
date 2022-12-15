const express = require("express");
const router = express.Router();

const usersController  = require("../controllers/users");
const {
  validationBody,
  validationParams } = require("../middlewares/validation");
const { auth } = require("../middlewares/auth");
const { upload } = require("../middlewares/upload");
const { tryCatchWrapper } = require("../helpers/tryCatchWrapper");
const {
  credentialsJoiSchema,
  verifyJoiSchema,
  emailJoiSchema} = require("../models/users");


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

router.patch("/avatars",
  auth,
  upload.single("avatar"),
  tryCatchWrapper(usersController.updateAvatar));

router.get("/verify/:verificationToken",
  validationParams(verifyJoiSchema),
  tryCatchWrapper(usersController.verifyEmail));

router.post("/verify",
  validationBody(emailJoiSchema),
  tryCatchWrapper(usersController.resendVerifyEmail));

module.exports = router;