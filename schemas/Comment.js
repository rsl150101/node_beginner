const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: String, required: true, trim: true },
  password: { type: Number, required: true, trim: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
});

module.exports = mongoose.model("Comment", commentSchema);
