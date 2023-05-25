const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const { validateBody } = require("../../middlewares");
const { joiSchemas } = require("../../models/user");
const authenticate = require("../../middlewares/authenticate");

router.post("/register", validateBody(joiSchemas.authSchema), ctrl.register);

router.post("/login", validateBody(joiSchemas.authSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
