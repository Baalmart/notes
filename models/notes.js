const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
var uniqueValidator = require("mongoose-unique-validator");

const noteSchema = new mongoose.Schema({
  title: { type: String, default: "none" },
  description: { type: String, default: "none" },
  body: { type: String, default: "none" },
  access: { type: Boolean, default: true },
  user: { type: ObjectId, ref: "user" }
});

noteSchema.pre('find', function () {
  this.populate('user');
});

noteSchema.statics.getByUserId = function (userId, callback) {
  return this.find({ user: userId })
    .select("title", "description", "body")
    .exec(callback);
};

noteSchema.statics.view = function (user, callback) {
  return this.find(
    { "$or": [{ "access": true }, { "user": user }] },
    "title description body"
  ).exec(callback);
};


noteSchema.plugin(uniqueValidator);

const note = mongoose.model("note", noteSchema);

module.exports = note;
