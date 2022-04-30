// Creating the database url
const mongoose = require("mongoose");

// The mongodb url
const url = "mongodb://localhost/SocialApi";

// The mongoose connect
mongoose.connect(url).then(() => {
  console.log("The DataBase is now Connected Successfully");
});
