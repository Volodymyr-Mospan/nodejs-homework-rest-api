const Joi = require("joi");

const contactAddBodySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
});

const contactUpdateBodySchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
})
  .min(1)
  .required();

module.exports = { contactAddBodySchema, contactUpdateBodySchema };
