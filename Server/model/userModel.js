// Calling all dependencies
const mongoose = require("mongoose");

// Creating the userSchema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

// Creating the user collection
const userModel = mongoose.model("User", userSchema);

// The Schema export
module.exports = userModel;
