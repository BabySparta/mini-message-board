var express = require("express");
var router = express.Router();
const Message = require("../models/Message");

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_STRING;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

router.use(express.urlencoded({ extended: true }));

router.get("/", function (req, res, next) {
  res.render("new", { title: "Add new post" });
});

router.post("/", async (req, res) => {
  const userName = req.body.userName;
  const userMessage = req.body.userMessage;
  try {
    const message = new Message({
      name: userName,
      message: userMessage,
      date: new Date(),
    });

    await message.save();
    res.redirect("/");
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving the message."); 
  }

});

module.exports = router;
