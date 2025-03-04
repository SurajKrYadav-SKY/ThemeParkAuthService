const express = require("express");
const {
  signup,
  login,
  getUserInfo,
  updateProfile,
  addProfilePic,
  removeProfilePic,
} = require("../../controller/user-controller");
const { verifyToken } = require("../../middlewares/auth-middleware");
const { upload } = require("../../config/file-upload");
const router = express.Router();

const profileUpload = upload.single("profile-image");

router.post("/signup", signup);
router.post("/login", login);
router.get("/user-info", verifyToken, getUserInfo);
router.post("/update-profile", verifyToken, updateProfile);
router.post("/add-profile-image", verifyToken, profileUpload, addProfilePic);
router.delete("/remove-profile-image", verifyToken, removeProfilePic);
