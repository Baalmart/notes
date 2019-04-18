const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema({
  title: { type: String, default: "none" },
  description: { type: String, default: "none" },
  body: { type: String, default: "none" },
  access: { type: Boolean, default: false },
  user: { type: ObjectId, ref: "user" }
});

const note = mongoose.model("note", noteSchema);

module.exports = note;
