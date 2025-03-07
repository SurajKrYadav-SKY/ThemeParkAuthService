const UserService = require("../services/user-service");

const userService = new UserService();

const signup = async (req, res) => {
  try {
    const response = await userService.signup({
      email: req.body.email,
      password: req.body.password,
    });
    res.cookie("jwt", response.generateJWT(), {
      maxAge: 3600000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    return res.status(201).json({
      id: response.id,
      email: response.email,
      profileSetup: response.profileSetup,
      firstName: response.firstName,
      lastName: response.lastName,
      image: response.image,
      color: response.color,
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: error.message || "Something went wrong in the controller.",
      error: { error },
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await userService.login(req.body);
    const token = user.generateJWT();

    res.cookie("jwt", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // None for cross-origin in production
    });
    return res.status(200).json({
      id: user.id,
      email: user.email,
      profileSetup: user.profileSetup,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      color: user.color,
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: error.message || "Something went wrong.",
      error: { error },
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    // console.log("inside controller", req.userId);
    const user = await userService.getUserById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User with given id not found" });
    }
    return res.status(200).json({
      id: user.id,
      email: user.email,
      profileSetup: user.profileSetup,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      color: user.color,
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: error.message || "Something went wrong.",
      error: {},
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    // console.log("user Id is : ", req.userId);
    const user = await userService.updateProfile(req.userId, req.body);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }

    return res.status(200).json({
      id: user.id,
      email: user.email,
      profileSetup: user.profileSetup,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      color: user.color,
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: error.message || "Something went wrong.",
      error: error.message || {},
    });
  }
};

const addProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Profile Image is required",
      });
    }
    const payload = {
      userId: req.userId,
      file: req.file,
    };
    const response = await userService.updateProfilePic(payload);
    return res.status(200).json({
      success: true,
      image: response.image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

const removeProfilePic = async (req, res) => {
  try {
    await userService.removeProfilePic(req.userId);
    return res.status(200).json({
      message: "Profile image removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
      data: {},
      error: error.message || {},
    });
  }
};

const getUser = async (req, res) => {
  try {
    const response = await userService.getUserByUserId(req.params.id);
    res.status(200).json({
      data: response,
      success: true,
      message: "Successfully fetched the user",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
      error: error.message || {},
    });
  }
};

module.exports = {
  signup,
  login,
  getUser,
  getUserInfo,
  updateProfile,
  addProfilePic,
  removeProfilePic,
};
