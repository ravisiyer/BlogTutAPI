// Program to be run separately from the app server.
// This creates a user, password pair in MongoDB Users collection.
const connectDB = require("../db/connect");
const User = require("../models/user");
require("dotenv").config();

const createUser = async (username, password) => {
  if (username && password) {
    try {
      await User.create({
        username: username,
        password: password,
      });
      console.log(`User with username: ${username} created successfully`);
      return true;
    } catch (error) {
      console.log(
        `User with username: ${username} creation failed. Error: ${error}`
      );
      return false;
    }
  } else {
    console.log(
      `Bad arguments to createUser() function. User with username: ${username} creation failed`
    );
    return false;
  }
};

const start = async () => {
  if (process.argv.length !== 4) {
    console.error("Expect two arguments! username password");
    process.exit(1);
  }
  const username = process.argv[2];
  const password = process.argv[3];
  console.log(
    `Arguments received: username: ${username}, password: ${password}`
  );

  const bcrypt = require("bcrypt");
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const db = await connectDB(process.env.MONGO_URI);
    console.log("Just after await connectDB(). Presumably connected to DB ...");
    await createUser(username, hash);
    db.disconnect();
  } catch (err) {
    console.log(`${err}`);
  }
};
start();
