const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    min: 1,
  },
  password: {
    type: String,
    required: true,
    min: 1,
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
