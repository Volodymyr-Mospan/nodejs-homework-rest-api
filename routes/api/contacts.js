const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  validateBody,
  validateUpdateFavorite,
  isValidId,
  authenticate,
} = require("../../middlewares");
const { joiSchemas } = require("../../models/contact");

router.use(authenticate);

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(joiSchemas.contactBodySchema), ctrl.addContact);

router.put(
  "/:id",
  isValidId,
  validateBody(joiSchemas.contactBodySchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateUpdateFavorite(joiSchemas.contactUpdateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", isValidId, ctrl.removeContact);

module.exports = router;
