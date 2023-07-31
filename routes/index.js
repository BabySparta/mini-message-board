var express = require("express");
var router = express.Router();
const Message = require("../models/Message");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_STRING;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const messages = await Message.find({}).sort({ date: -1 })
    res.render("index", { title: "Message Board", messages });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching messages.");
  }
});

module.exports = router;
