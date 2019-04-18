var mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
var uniqueValidator = require("mongoose-unique-validator");

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  notes: [{ type: ObjectId, ref: "note" }]
});

userSchema.plugin(uniqueValidator);

var User = mongoose.model("user", userSchema);

module.exports = User;
