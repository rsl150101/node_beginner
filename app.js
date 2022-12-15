const express = require("express");
const connect = require("./schemas");
const commentRouter = require("./routers/commentRouter");
const postRouter = require("./routers/postRouter");

connect();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.listen(PORT, () => {
  console.log(`✅ 서버가 연결되었습니다. http://127.0.0.1:${PORT}`);
});
