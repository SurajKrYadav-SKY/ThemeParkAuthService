const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  ORIGIN1: process.env.ORIGIN1,
  ORIGIN2: process.env.ORIGIN2,
  SECRET_KEY: process.env.SECRET_KEY,
  SALT: process.env.SALT,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_API_URL: process.env.OPENAI_API_URL,
  HF_API_TOKEN: process.env.HF_API_TOKEN,
  HF_API_URL: process.env.HF_API_URL,
  PROFILE_UPLOAD_DIR:
    process.env.PROFILE_UPLOAD_DIR ||
    path.join(__dirname, "uploads", "profiles"),
};
