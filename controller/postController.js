const Post = require("../schemas/Post");
const mongoose = require("mongoose");

const getPost = async (req, res) => {
  const posts = await Post.find({});
  const data = posts.map((post) => ({
    postId: post.id,
    user: post.user,
    title: post.title,
    createdAt: post.createdAt,
  }));
  res.json({ data });
};

const postPost = async (req, res) => {
  const { user, password, title, content } = req.body;
  if (
    [user, password, title, content].includes("") ||
    JSON.stringify(req.body) === "{}"
  ) {
    return res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
  }
  await Post.create({
    user,
    password,
    title,
    content,
  });

  res.status(201).json({ msg: "게시글을 생성하였습니다." });
};

const getPostOne = async (req, res) => {
  const { _postId } = req.params;
  try {
    const exist = await Post.exists({ _id: _postId });
    const post = await Post.findById(_postId);
    const { user, title, content, createdAt } = post;
    const data = { postId: _postId, user, title, content, createdAt };
    res.json({ data });
  } catch {
    return res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
  }
  // const post = await Post.findOne({ _id: _postId });
  // console.log(post, typeof _postId);
  // if (!post) {
  //   return res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
  // }
  // const { user, title, content, createdAt } = post;
  // const data = { postId: _postId, user, title, content, createdAt };
  // res.json({ data });
};

const editPost = async (req, res) => {
  const { _postId } = req.params;
  const { password, title, content } = req.body;
  if (!mongoose.isValidObjectId(_postId)) {
    return res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
  }
  const post = await Post.findOne({ _id: _postId });
  if (!post) {
    return res.status(404).json({ msg: "게시글 조회에 실패하였습니다." });
  }
  if (post.password !== password) {
    return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
  }

  await Post.findByIdAndUpdate(_postId, {
    title,
    content,
  });

  res.status(200).json({ msg: "게시글을 수정하였습니다." });
};

const deletePost = async (req, res) => {
  const { _postId } = req.params;
  const { password } = req.body;
  if (!mongoose.isValidObjectId(_postId)) {
    return res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
  }
  const post = await Post.findOne({ _id: _postId });
  if (!post) {
    return res.status(404).json({ msg: "게시글 조회에 실패하였습니다." });
  }
  if (post.password !== password) {
    return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
  }

  await Post.findByIdAndDelete(_postId);

  res.status(200).json({ msg: "게시글이 삭제되었습니다." });
};

exports.getPost = getPost;
exports.postPost = postPost;
exports.getPostOne = getPostOne;
exports.editPost = editPost;
exports.deletePost = deletePost;
