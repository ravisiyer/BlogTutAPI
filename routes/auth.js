const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  // console.log(req.body);
  const { fname, lname } = req.body;
  console.log(fname, lname);
  if (fname && lname) {
    return res.status(200).send(`Welcome ${fname} ${lname}`);
  }
  res.status(401).send("Please specify first and last name");
});

module.exports = router;
