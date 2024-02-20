const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    shopId: {
      type: String,
      unique:true
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
