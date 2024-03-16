// Program to be run separately from the app server.
// This checks whether a matching user, password pair is present in MongoDB Users collection.
const connectDB = require("../db/connect");
const User = require("../models/user");
require("dotenv").config();

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

  try {
    const db = await connectDB(process.env.MONGO_URI);
    console.log("Just after await connectDB(). Presumably connected to DB ...");
    const user = await User.findOne({ username: username }).exec();
    db.disconnect();
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        console.log(
          `For username: ${username}, password argument matches (hashed) password in Users collection`
        );
      } else {
        console.log(
          `For username: ${username}, password argument does not match (hashed) password` +
            ` in Users collection`
        );
      }
    } else {
      console.log(`username: ${username} not found in Users collection`);
    }
  } catch (err) {
    console.log(`${err}`);
  }
};

start();
