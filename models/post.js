const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title has to be specified"],
    trim: true,
  },
  body: {
    type: String,
    default: "",
  },
  datetime: { type: Date, default: Date.now },
});

// Note that below code seems to trigger creation of collection called posts in MongoDB.
const Post = mongoose.model("Post", schema);

module.exports = Post;
