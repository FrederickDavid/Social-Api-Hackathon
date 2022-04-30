// Calling all dependencies
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");

// Registering a user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashpassword = await bcrypt.genSalt(10);
    const realpassword = await bcrypt.hash(password, hashpassword);
    const createUser = await userModel.create({
      name,
      email,
      password: realpassword,
    });
    res
      .status(200)
      .json({ message: "User Registration Successfully", data: createUser });
  } catch (error) {
    res.status(401).json({ message: "Can't Register This User" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const signed = await userModel.findOne({ email: req.body.email });
    if (signed) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        signed.password
      );
      if (checkPassword) {
        const { password, ...data } = signed._doc;
        const token = jwt.sign(
          {
            id: signed._id,
            email: signed.email,
          },
          "MySecret",
          { expiresIn: "2d" }
        );
        res.status(201).json({
          message: `Welcome Back ${signed.name}`,
          data: { ...data, token },
        });
      } else {
        res
          .status(404)
          .json({ message: "Password is incorrect...! Try Again..." });
      }
    } else {
      res.status(404).json({ message: "User not registered in this database" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Getting all registered users
router.get("/users", async (req, res) => {
  try {
    const getUsers = await userModel.find();
    res.status(200).json({
      message: "All Registered Users Found",
      totalUser: getUsers.length,
      data: getUsers,
    });
  } catch (error) {
    res.status(401).json({ message: "No user found in this Database" });
  }
});

// Getting a registered user
router.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getUsers = await userModel.findById(id);
    res.status(200).json({
      message: "User Found",
      data: getUsers,
    });
  } catch (error) {
    res.status(401).json({ message: "No user found with such ID" });
  }
});

// // Deleting a registered user
// router.delete("/users/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const getUsers = await userModel.findByIdAndRemove(id);
//     res.status(200).json({
//       message: "User Deleted",
//       data: getUsers,
//     });
//   } catch (error) {
//     res.status(401).json({ message: "No user found with such ID" });
//   }
// });

module.exports = router;
