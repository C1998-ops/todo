const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true,default:Date.now },
  
},{timestamps:true});

// console.log(currentdate);

const Token = mongoose.model("tokenmodels", TokenSchema);
module.exports = Token;
