// Connecting the Database to the server
require("./config/db");

// Calling all dependencies
const express = require("express");
const port = 2022;
const app = express();
app.use(express.json());
app.use("/", require("./router/userRoute"));

// Get our first response
app.get("/", (req, res) => {
  res.status(200).json({ message: "A Very Simple Api" });
});

// Check the app is up and running
app.listen(port, (req, res) => {
  console.log(`App is now listening to Port: ${port}`);
});
