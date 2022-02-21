const catchAsyncError = require("../middleWare/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const ApiFeatures = require("../utils/apiFeatures");

// 1--> get all posts
// 2--> get a post
// 3--> create a new post --LOGGED IN
// 4--> update a post --LOGGED IN
// 5--> delete a post --LOGGED IN

// get all post ======================
exports.getAllPosts = catchAsyncError(async (req, res, next) => {
  // const postCount = await Post.count();
  const apiFeature = new ApiFeatures(Post.find(), req.query)
    .searchFeature()
    .paginationFeature(process.env.BLOG_PER_PAGE);
  const posts = await apiFeature.query;
  res.status(200).send({ success: true, posts });
});

// get a post ========================
exports.getAPost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("post not found", 404));
  }
  const comments = await Comment.find({ postId: req.params.id });
  return res.status(200).send({ success: true, post, comments });
});

// create a new post --LOGGED IN ========
exports.createAnewPost = catchAsyncError(async (req, res, next) => {
  const post = await Post.create(req.body);
  res.status(201).json({ success: true, post });
});

// Update a post --LOGGED IN ===========
exports.updatePost = catchAsyncError(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("post not found", 404));
  }

  if (Object.keys(req.body).length === 0) {
    return next(
      new ErrorHandler("provide at least one data what you want to update", 400)
    );
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
  });

  return res.status(200).send({ success: true, post });
});

// Delete a post --LOGGED IN ===============
exports.deletePost = catchAsyncError(async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("post not found", 404));
  }
  await post.remove();
  res.status(200).json({ success: true, message: "post deleted successfully" });
});
