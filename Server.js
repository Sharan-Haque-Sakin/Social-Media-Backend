// External Imports
const path = require("path");
// const config = require("./config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// Internal Imports

const PostRoutes = require("./Routes/Posts");
const Routes = require("./Routes/Users");
const UserIn = require("./Routes/Auth");
const getName = require("./Routes/getName");
require("dotenv").config();

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("DB connected!"))
  .catch((err) => console.log(err));
app.use("/user", Routes);

// mongoose
//   .connect(process.env.MONGODB)
//   .then(() => {
//     console.log("MongoDb connected");
//   })
//   .catch((err) => console.log(err));

// Parsers and Middlewares!

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.static(path.join(__dirname, "./Client/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/getname", getName);
app.use("/user/auth", UserIn);
app.use("/posts/", PostRoutes);

// Port

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("App listening on port");
});

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// //Routes go here

// //Connect to the database before listening
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log("listening for requests");
//   });
// });
