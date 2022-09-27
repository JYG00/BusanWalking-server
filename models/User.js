const mongoose = require("mongoose");
const schema = mongoose.Schema;

// 유저 이메일, 이름
const userSchema = new schema(
  {
    email: {
      type: String,
      require: true,
    },
    name: String,
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

module.exports = mongoose.model("User", userSchema);
