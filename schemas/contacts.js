const Joi = require("joi");

const contactBodySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({
      "any.required": "missing required email",
      "string.email": "Invalid format email",
    }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone",
  }),
  favorite: Joi.boolean(),
})
  .required()
  .messages({
    "any.required": "missing fields",
  });

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).required();

module.exports = {
  contactBodySchema,
  contactUpdateFavoriteSchema,
};
