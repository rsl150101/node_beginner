const Post = require("../schemas/Post");

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

exports.getPost = getPost;
exports.postPost = postPost;
