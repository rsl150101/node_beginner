const Comment = require("../schemas/Comment");
const mongoose = require("mongoose");
const Post = require("../schemas/Post");

const getComments = async (req, res) => {
  const { _postId } = req.params;

  if (!mongoose.isValidObjectId(_postId)) {
    return res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
  }
  const post = await Post.findOne({ _id: _postId });
  if (!post) {
    return res.status(404).json({ msg: "게시글 조회에 실패하였습니다." });
  }
  if (post.comments.length === 0) {
    return res.json({ msg: "댓글이 없습니다." });
  }
  const data = [];

  for (let i = 0; i < post.comments.length; i++) {
    const comment = await Comment.findById(post.comments[i]._id);
    const { _id, user, content, createdAt } = comment;
    data.push({ commentId: _id, user, content, createdAt });
  }

  return res.json({ data });
};

const postComment = async (req, res) => {
  const { _postId } = req.params;
  const { user, password, content } = req.body;

  if (!mongoose.isValidObjectId(_postId)) {
    return res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
  }
  const post = await Post.findOne({ _id: _postId });
  if (!post) {
    return res.status(404).json({ msg: "게시글 조회에 실패하였습니다." });
  }
  if (
    [user, password, content].includes("") ||
    JSON.stringify(req.body) === "{}"
  ) {
    return res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
  }
  const comment = await Comment.create({
    user,
    password,
    content,
    post: _postId,
  });
  post.comments.push(comment._id);
  post.save();

  return res.status(201).json({ msg: "댓글을 생성하였습니다." });
};

const editComment = async (req, res) => {
  const { _commentId } = req.params;
  const { password, content } = req.body;
  if (!mongoose.isValidObjectId(_commentId)) {
    return res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
  }
  const comment = await Comment.findOne({ _id: _commentId });
  if (!comment) {
    return res.status(404).json({ msg: "댓글 조회에 실패하였습니다." });
  }
  if (comment.password !== password) {
    return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
  }
  if (content === "") {
    return res.status(400).json({ msg: "댓글 내용을 입력해주세요." });
  }

  await Comment.findByIdAndUpdate(_commentId, {
    content,
  });

  res.status(200).json({ msg: "댓글을 수정하였습니다." });
};

const deleteComment = async (req, res) => {
  const { _commentId } = req.params;
  const { password } = req.body;
  if (!mongoose.isValidObjectId(_commentId)) {
    return res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
  }
  const comment = await Comment.findOne({ _id: _commentId });
  if (!comment) {
    return res.status(404).json({ msg: "댓글 조회에 실패하였습니다." });
  }
  if (comment.password !== password) {
    return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
  }
  const post = await Post.findById(comment.post);
  post.comments = post.comments.filter(
    (comment) => comment.toString() !== _commentId
  );
  post.save();
  await Comment.findByIdAndDelete(_commentId);
  res.status(200).json({ msg: "댓글을 삭제하였습니다." });
};

exports.getComments = getComments;
exports.postComment = postComment;
exports.editComments = editComment;
exports.deleteComments = deleteComment;
