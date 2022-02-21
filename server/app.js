const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const errMiddleware = require("./middleWare/error");
const cors = require("cors");
const postRouter = require("./routes/postRoute");
const commentRouter = require("./routes/commentRoute");

//middlewares
app.use(express.json());
app.use(cookieParser());

//middleware for error
app.use(errMiddleware);
app.use(cors());

// routs middleware
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

module.exports = app;