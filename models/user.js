const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {},
  fullname: {},
  email: {},
  password: {}
});

userSchema.plugin(uniqueValidator);

let user = mongoose.model("user", userSchema);

module.exports = user;
