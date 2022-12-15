const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/node_beginner")
    .catch((err) => console.log(err));
};

const handleOpenDB = () => console.log("✅ DB 가 연결되었습니다.");

mongoose.connection.on("error", (err) => {
  console.error("❎ 몽고디비 연결 에러", err);
});

mongoose.connection.once("open", handleOpenDB);

module.exports = connect;
