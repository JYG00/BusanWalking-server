const express = require("express");
const server = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "variables.env" });
const User = require("./models/User");
const Post = require("./models/Post");

server.use(express.json());

// 회원가입
server.post("/join", (req, res) => {
  const newUser = new User();
  newUser.email = req.body.email;
  newUser.name = req.body.name;
  newUser
    .save()
    .then((user) => {
      console.log(user);
      res.json({ message: "User Create Successfully" });
    })
    .catch((err) => res.json({ message: "User was not successfully created" }));
});

// 로그인
server.post("/login", async (req, res) => {
  try {
    const users = await User.find({
      name: req.body.name,
      email: req.body.email,
    });
    if (users.length > 0) {
      res.send(users);
    } else {
      res.json({ message: "User was not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

// 게시글 등록
server.post("/post/add", (req, res) => {
  const newPost = new Post();
  newPost.user = req.body.user;
  newPost.title = req.body.title;
  newPost.content = req.body.content;
  newPost
    .save()
    .then((post) => {
      console.log(post);
      res.json({ message: "Post Create Successfully" });
    })
    .catch((err) => res.json({ message: "Post was not successfully created" }));
});

// 게시글 조회
server.get("/post/read", async (req, res) => {
  try {
    const post = await Post.find({});
    if (post.length > 0) {
      res.send(post);
    } else {
      res.json({ message: "Post was not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

//게시글 수정
server.put("/post/update/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body);
    res.send(post);
  } catch (err) {
    console.log(err);
  }
});

//게시글 삭제
server.delete("/post/delete/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id, req.body);
    if (!post) {
      res.status(404).send;
    } else {
      res.send(post);
    }
  } catch (err) {
    console.log(err);
  }
});

server.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  } else {
    // 디비 연결
    mongoose.connect(
      process.env.MONGODB_URL,
      { useNewUrlParser: true },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Connected to database successfully");
        }
      }
    );
  }
});
