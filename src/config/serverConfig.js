const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  ORIGIN: process.env.ORIGIN,
  SECRET_KEY: process.env.SECRET_KEY,
  SALT: process.env.SALT,
  PROFILE_UPLOAD_DIR:
    process.env.PROFILE_UPLOAD_DIR ||
    path.join(__dirname, "uploads", "profiles"),
};
