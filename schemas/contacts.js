const Joi = require("joi");

const contactBodySchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({
      "any.required": "missing required email field",
      "string.email": "Invalid format email",
    }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
})
  .required()
  .messages({
    "any.required": "missing fields",
  });

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
}).required();

module.exports = {
  contactBodySchema,
  contactUpdateFavoriteSchema,
};
