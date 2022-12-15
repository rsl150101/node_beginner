const express = require("express");
const connect = require("./schemas");
const commentRouter = require("./routers/comments");
const postRouter = require("./routers/posts");

connect();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.listen(PORT, () => {
  console.log(`✅ 서버가 연결되었습니다. http://localhost:${PORT}`);
});
