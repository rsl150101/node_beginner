const express = require("express");
const commentApi = require("../controller/commentController");
const router = express.Router();

router
  .route("/:_postId")
  .get(commentApi.getComments)
  .post(commentApi.postComment);

router
  .route("/:_commentId")
  .put(commentApi.editComments)
  .delete(commentApi.deleteComments);

module.exports = router;
