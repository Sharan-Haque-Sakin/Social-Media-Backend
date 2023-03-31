const { getPostRoute, handlePosts } = require("../Controllers/PostsController");

const Routes = require("express").Router();
const jwt = require("jsonwebtoken");

// Get Post Route

Routes.get("/", getPostRoute);

Routes.get("/getname", (req, res) => {
  const decoded = jwt.verify(req.cookies.authcookie, process.env.secret);

  const { userName, userId } = decoded;

  res.status(200).json({
    userName: userName,
    userId: userId,
  });
});

// Upload Posts!

Routes.post("/", async (req, res) => {
  const decoded = jwt.verify(req.cookies.authcookie, process.env.secret);
  const { userName, userId } = decoded;

  try {
    const Post = await new PostModel({
      content: req.body.content,
      user: userId,
    });
    await Post.save();

    // res.send("Post successful!");
    res.status(200).json({
      msg: "Post Successful! ",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "error",

      success: false,
    });
  }
});

module.exports = Routes;
