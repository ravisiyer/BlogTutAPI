const Post = require("../models/post");
const asyncWrapper = require("../middleware/asyncWrapper");
const { createAPICustomError } = require("../errors/apicustomerror");

const getPosts = asyncWrapper(async (req, res) => {
  const dbPosts = await Post.find({});
  res.status(200).json({ success: true, data: dbPosts });
});

const getPost = asyncWrapper(async (req, res, next) => {
  const { postID } = req.params;
  console.log(postID);
  const post = await Post.findOne({ _id: postID }).exec();
  if (!post) {
    return next(
      createAPICustomError(404, `Post with _id: ${postID} does not exist.`)
    );
    // return res.status(404).json({
    //   success: false,
    //   msg: `Post with _id: ${postID} does not exist.`,
    // });
  }
  return res.status(200).json({ success: true, data: post });
});

const createPost = asyncWrapper(async (req, res, next) => {
  const { title, body, datetime } = req.body;
  // console.log(title);
  // console.log(body);
  // console.log(datetime);
  if (title) {
    // even if title is "" (empty string), the test seems to return false
    const post = await Post.create({
      title: title,
      body: body,
      datetime: datetime,
    });
    return res.status(201).json({ success: true, data: post });
  } else {
    return next(createAPICustomError(500, "Please supply title"));
    // return res.status(500).json({ success: false, msg: "Please supply title" });
  }
});

const updatePost = asyncWrapper(async (req, res, next) => {
  const { postID } = req.params;
  console.log(postID);
  const post = await Post.findOneAndUpdate(
    { _id: postID },
    { title: req.body.title, body: req.body.body, datetime: req.body.datetime },
    { new: true, runValidators: true }
  );
  if (!post) {
    return next(
      createAPICustomError(404, `Post with _id: ${postID} does not exist.`)
    );
    // return res.status(404).json({
    //   success: false,
    //   msg: `Post with _id: ${postID} does not exist.`,
    // });
  }
  return res.status(200).json({ success: true, data: post });
});

const deletePost = asyncWrapper(async (req, res, next) => {
  const { postID } = req.params;
  console.log(postID);
  const post = await Post.findOneAndDelete({ _id: postID });
  if (!post) {
    return next(
      createAPICustomError(404, `Post with _id: ${postID} does not exist.`)
    );
    // return res.status(404).json({
    //   success: false,
    //   msg: `Post with _id: ${postID} does not exist.`,
    // });
  }
  return res.status(200).json({ success: true, data: post });
});

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
