const User = require("../models/user");
const { unlink } = require("fs/promises");

class UserRepository {
  async createUser(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the repository layer.", error);
      throw error;
    }
  }

  async getUser(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong in the repository layer.");
      throw error;
    }
  }

  async getUserByUserId(userId) {
    try {
      const user = await User.findById(userId, "firstName email");
      return user;
    } catch (error) {
      console.log("Something went wrong in the repository layer.");
      throw error;
    }
  }

  async updateUser(userId, data) {
    try {
      const { firstName, lastName, color } = data;

      if (!firstName || !lastName || color === null) {
        throw new Error("First name, last name, and color are required");
      }

      if (typeof firstName !== "string" || typeof lastName !== "string") {
        throw new Error("First name, last name, and color must be strings");
      }
      const user = await User.findByIdAndUpdate(
        userId,
        {
          firstName,
          lastName,
          color,
          profileSetup: true,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      return user;
    } catch (error) {
      console.log("Something went wrong in the repository layer.");
      throw error;
    }
  }

  async destroyUser(userId) {
    try {
      const response = await User.findByIdAndDelete(userId);
      return response;
    } catch (error) {
      console.log("Something went wrong in the repository layer.");
      throw error;
    }
  }

  async findBy(data) {
    try {
      const response = await User.findOne(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateProfilePic(userId, fileName) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      user.image = fileName;
      await user.save();
      return user;
    } catch (error) {
      console.log("Something went wrong in the repository layer.");
      throw error;
    }
  }

  async removeProfilePic(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("user not found");
      }
      if (user.image) {
        try {
          await unlink(user.image); // Delete the file
        } catch (err) {
          console.error("Error deleting image file:", err);
        }
      }
      user.image = null;
      await user.save();
      return user;
    } catch (error) {
      console.log("Something went wrong in the repository layer.");
      throw error;
    }
  }
}

module.exports = UserRepository;
