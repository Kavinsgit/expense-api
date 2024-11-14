const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Yes. Username is required"],
  },
  password: {
    type: String,
    required: [true, "Yes. Password is also required"],
  },
  email: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
