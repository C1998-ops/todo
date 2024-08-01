const mongoose = require("mongoose");
const validator = require("validator");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const TokenType = Object.freeze({
  ACCESS: "access",
  REFRESH: "refresh",
});
const SALT_FACTOR = 10;
// const AddressSchema=new mongoose.Schema({

// })
const SignupSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not a valid Email");
        }
      },
    },
    phone: {
      type: String,

      // required: true,
    },
    address: [
      {
        type: Object,
        _id: {
          type: mongoose.Types.ObjectId,
          default: mongoose.Types.ObjectId,
        },
      },
    ],
    Active: {
      type: Boolean,
      default: false,
    },
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarImage: {
      type: String,
    },

    authType: {
      type: String,
      enum: ["firebase", "system", "google"],
      default: "system",
    },
    password: {
      type: String,
      // required: true,
    },
    confirmpassword: {
      type: String,
      //  required: true
    },
  },

  { timestamps: true }
);
SignupSchema.pre("save", async function save(next) {
  var user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});
SignupSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
const SignupEmail = mongoose.model("SignupEmail", SignupSchema);
const validate = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required().label("email"),
    otp: Joi.string()
      .min(3)
      .max(6)
      .pattern(/^[0-9]+$/)
      .label("otp"),
    password: Joi.string().label("password"),
    confirmpassword: Joi.string().label("confirmpassword"),
  });
  return schema.validate(data);
};
module.exports = { SignupEmail, validate, TokenType };
