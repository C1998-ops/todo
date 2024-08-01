const mongoose = require("mongoose");
const RefreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,

      required: true,
    },
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SignupEmail",
      unique: true,
    },
    created: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
const RefreshToken = mongoose.model("refreshTokens", RefreshTokenSchema);
module.exports = RefreshToken;
