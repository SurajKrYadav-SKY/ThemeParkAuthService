const express = require("express");
const {
  signup,
  login,
  getUserInfo,
  updateProfile,
} = require("../../controller/user-controller");
const { verifyToken } = require("../../middlewares/auth-middleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user-info", verifyToken, getUserInfo);
router.post("/update-profile", verifyToken, updateProfile);
