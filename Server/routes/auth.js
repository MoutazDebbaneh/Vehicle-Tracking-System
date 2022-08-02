const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.post("/signup", authController.signup);

authRouter.post("/signin", authController.signin);

authRouter.delete("/signout", authController.signout);

authRouter.get(
  "/authenticateUser",
  authController.authenticateToken,
  (req, res) => {
    res.json({ id: req.userId });
  }
);

authRouter.post("/regenerateAccessToken", authController.regenerateAccessToken);

module.exports = authRouter;
