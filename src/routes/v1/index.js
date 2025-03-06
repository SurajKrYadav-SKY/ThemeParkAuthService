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
const { createRole } = require("../../controller/role-controller");
const { generateProfile } = require("../../controller/profile-controller");
const router = express.Router();

const profileUpload = upload.single("profile-image");

// user

router.post("/signup", signup);
router.post("/login", login);
router.get("/user-info", verifyToken, getUserInfo);
router.post("/update-profile", verifyToken, updateProfile);
router.post("/add-profile-image", verifyToken, profileUpload, addProfilePic);
router.delete("/remove-profile-image", verifyToken, removeProfilePic);

// roles

router.post("/role", createRole);

// open ai api route

router.post("/gen-profile-pic", generateProfile);

module.exports = router;
