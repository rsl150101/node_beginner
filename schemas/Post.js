const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: { type: String, required: true, trim: true },
  password: { type: Number, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);
