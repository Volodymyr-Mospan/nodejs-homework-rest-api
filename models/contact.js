const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", (error, date, next) => {
  error.status = 400;
  next();
});

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

const joiSchemas = {
  contactBodySchema,
  contactUpdateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { joiSchemas, Contact };
