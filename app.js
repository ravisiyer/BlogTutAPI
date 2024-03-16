const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const basicAuth = require("express-basic-auth");
const connectDB = require("./db/connect");
const morgan = require("morgan");
const postsRouter = require("./routes/posts");
const User = require("./models/user");
require("dotenv").config();
const notFoundHandler = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const bcrypt = require("bcrypt");

const port = process.env.PORT || 3000;
const enableAuth = process.env.ENABLE_AUTH || "N";

if (enableAuth === "Y") {
  app.use(
    basicAuth({
      authorizer: myAsyncAuthorizer,
      authorizeAsync: true,
    })
  );
  console.log("Authentication enabled");
} else {
  console.log("Authentication disabled");
}

async function myAsyncAuthorizer(username, password, cb) {
  try {
    const user = await User.findOne({ username: username }).exec();
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return cb(null, true);
      } else {
        return cb(null, false);
      }
    } else {
      return cb(null, false);
    }
  } catch (error) {
    return cb(null, false);
  }
}

app.use(morgan("tiny"));
app.use(express.static("./static"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/posts", postsRouter);
app.use(notFoundHandler);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Just after await connectDB(). Presumably connected to DB ...");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.log(`Failed to connect to DB. ... ${err}`);
  }
};
start();
