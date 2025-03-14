const express = require("express");
const {
  signup,
  login,
  getUser,
  getUserInfo,
  updateProfile,
  addProfilePic,
  removeProfilePic,
} = require("../../controller/user-controller");
const { verifyToken } = require("../../middlewares/auth-middleware");
const { upload } = require("../../config/file-upload");
const { createRole } = require("../../controller/role-controller");
const {
  generateProfilePic,
  huggingFaceGeneratePic,
} = require("../../controller/profile-controller");
const router = express.Router();

const profileUpload = upload.single("profile-image");

// user

router.post("/signup", signup);
router.post("/login", login);
router.get("/users/:id", getUser);
router.get("/user-info", verifyToken, getUserInfo);
router.post("/update-profile", verifyToken, updateProfile);
router.post("/add-profile-image", verifyToken, profileUpload, addProfilePic);
router.delete("/remove-profile-image", verifyToken, removeProfilePic);

// roles

router.post("/role", createRole);

// image generation api route

router.post("/open-ai-gen-pic", generateProfilePic);
router.post("/hugging-face-gen-pic", huggingFaceGeneratePic);

module.exports = router;
