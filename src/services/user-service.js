const UserRepository = require("../repository/user-repository");
const { rename } = require("fs/promises");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(data) {
    try {
      const user = await this.userRepository.createUser(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
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
      const fileName = `uploads/profiles/${date}-${data.file.originalname}`;
      await rename(data.file.path, fileName);
      const updatedUser = await this.userRepository.updateProfilePic(
        data.userId,
        fileName
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
