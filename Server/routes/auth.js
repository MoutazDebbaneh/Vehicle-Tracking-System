const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_JWT_KEY } = require("../config");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with the same email already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      name,
      email,
      password: hashedPassword,
    });

    user = await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "No users with the same email were found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password for this email" });
    }

    const token = await jwt.sign({ id: user._id }, SECRET_JWT_KEY);
    console.log(token);
    return res.json({ token, ...user._doc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = authRouter;
