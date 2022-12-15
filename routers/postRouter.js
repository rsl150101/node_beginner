const express = require("express");
const router = express.Router();
const postApi = require("../controller/postController");

router.route("/").get(postApi.getPost).post(postApi.postPost);

module.exports = router;
