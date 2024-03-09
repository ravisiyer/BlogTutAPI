const express = require("express");
const cors = require("cors");
const app = express();
// CORS is enabled for all origins
app.use(cors());
const connectDB = require("./db/connect");
const morgan = require("morgan");
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");
require("dotenv").config();
const notFoundHandler = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// console.log(process.env.PORT);
const port = process.env.PORT || 3000;
app.use(morgan("tiny"));
app.use(express.static("./method-app"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/posts", postsRouter);
app.use("/login", authRouter);
app.use(notFoundHandler);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    // console.log(process.env.MONGO_URI);
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
