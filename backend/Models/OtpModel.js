const mongoose = require("mongoose");
const validator = require("validator");
const UserOtpSchema = new mongoose.Schema(
  {
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
    verified: {
      type: Boolean,
      defaultValue: false,
      allowNull: true,
    },
    otp: {
      type: String,
      default: null
    },
    otpExpiration: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const UserOtp = mongoose.model("userotps", UserOtpSchema);
module.exports = UserOtp;
