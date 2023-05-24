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
    token: String,
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

const registerSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "Set password for user",
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    "any.required": "Email is required",
  }),
}).required();

const joiSchemas = {
  registerSchema,
};

const User = model("user", userSchema);

module.exports = { joiSchemas, User };
