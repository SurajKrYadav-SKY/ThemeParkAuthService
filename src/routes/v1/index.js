const express = require("express");
const {
  signup,
  login,
  getUserInfo,
  updateProfile,
} = require("../../controller/user-controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user-info", getUserInfo);
router.post("/update-profile", updateProfile);
