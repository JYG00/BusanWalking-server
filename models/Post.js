const mongoose = require("mongoose");
const schema = mongoose.Schema;

// 작성자, 게시글 제목, 내용, 첨부사진
const postSchema = new schema(
  {
    user: String,
    title: String,
    content: String,
  },
  { timestamps: true }
);

// 데이터를 언제 생성했는지 프로그램이 기록
// 언제 최근에 업데이트 되었는지도 기록
// enrolled:{
//   type:Date,
//   default:Date.now
// }
// 대신 timestamps:true

module.exports = mongoose.model("Post", postSchema);
