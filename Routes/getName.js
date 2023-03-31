const Router = require("express").Router();
const jwt = require("jsonwebtoken");
Router.get("/", () => {
  const decoded = jwt.verify(req.cookies.authcookie, process.env.secret);
  const { userName, userId } = decoded;
  res.status(200).json({
    userName: userName,
    userId: userId,
  });
});

module.exports = Router;
