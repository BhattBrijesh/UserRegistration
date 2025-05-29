const express = require("express");
const {
  handleCreateUser,
  handleGetUserDetail,
  handleUserLogin,
} = require("../controller/user.controller");
const router = express.Router();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const token = authHeader.split(" ")[1];

  const SECRET_kEY = process?.env?.SECRET_kEY;

  try {
    const decoded = jwt.verify(token, SECRET_kEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
router
  .get("/getUser", authMiddleware, handleGetUserDetail)
  .post("/createUser", handleCreateUser)
  .post("/userLogin", handleUserLogin);
exports.userRouter = router;
