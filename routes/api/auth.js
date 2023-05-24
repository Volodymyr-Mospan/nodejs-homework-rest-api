const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const { validateBody } = require("../../middlewares");
const { joiSchemas } = require("../../models/user");

router.post(
  "/register",
  validateBody(joiSchemas.registerSchema),
  ctrl.register
);

module.exports = router;
