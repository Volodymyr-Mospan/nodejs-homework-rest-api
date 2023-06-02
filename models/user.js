const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", (error, date, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
});

const authSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "Set password for user",
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    "any.required": "Email is required",
  }),
}).required();

const subscriptionUpdateSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.only": "incorrect value",
    }),
}).required();

const joiSchemas = {
  authSchema,
  subscriptionUpdateSchema,
};

const User = model("user", userSchema);

module.exports = { joiSchemas, User };
