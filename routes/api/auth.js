const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const { validateBody } = require("../../middlewares");
const { joiSchemas } = require("../../models/user");

router.post("/register", validateBody(joiSchemas.authSchema), ctrl.register);

router.post("/login", validateBody(joiSchemas.authSchema), ctrl.login);

module.exports = router;
