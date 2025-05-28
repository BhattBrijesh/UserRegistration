const express = require("express");
const {
  handleCreateUser,
  handleGetUserDetail,
} = require("../controller/user.controller");
const router = express.Router();
router
  .get("/getUser", handleGetUserDetail)
  .post("/createUser", handleCreateUser);
exports.userRouter = router;
