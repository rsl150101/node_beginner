const express = require("express");
const router = express.Router();
const postApi = require("../controller/postController");

router.route("/").get(postApi.getPost).post(postApi.postPost);
router
  .route("/:_postId")
  .get(postApi.getPostOne)
  .put(postApi.editPost)
  .delete(postApi.deletePost);

module.exports = router;
