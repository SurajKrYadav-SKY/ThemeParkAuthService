const UserRepository = require("../repository/user-repository");
const { rename } = require("fs/promises");
const fs = require("fs").promises;
const path = require("path");
const { PROFILE_UPLOAD_DIR } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(data) {
    try {
      const user = await this.userRepository.createUser(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer", error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.userRepository.findBy({ email });
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await this.userRepository.getUser(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async getUserByUserId(userId) {
    try {
      const user = await this.userRepository.getUserByUserId(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async login(data) {
    try {
      const user = await this.getUserByEmail(data.email);
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordCorrect = user.comparePassword(data.password);
      if (!isPasswordCorrect) {
        throw new Error("Incorrect password");
      }
      return user;
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  }

  async updateProfile(userId, data) {
    try {
      const user = await this.userRepository.updateUser(userId, data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateProfilePic(data) {
    try {
      const date = Date.now();
      // const fileName = `uploads/profiles/${date}-${data.file.originalname}`;
      const fileName = `${date}-${data.file.originalname}`;

      const newFilePath = path.join(PROFILE_UPLOAD_DIR, fileName);

      // console.log("Original file path from Multer:", data.file.path);
      // console.log("New file path after rename:", newFilePath);

      // Renaming the file to the correct location
      await fs.rename(data.file.path, newFilePath);

      const updatedUser = await this.userRepository.updateProfilePic(
        data.userId,
        `uploads/profiles/${fileName}` // it matches what frontend expects
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async removeProfilePic(userId) {
    try {
      const response = await this.userRepository.removeProfilePic(userId);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
