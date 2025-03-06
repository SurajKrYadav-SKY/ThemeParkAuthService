const axios = require("axios");
const { OPENAI_API_KEY, OPENAI_API_URL } = require("../config/serverConfig");

const generateProfilePic = async (desc) => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        prompt: desc,
        n: 1,
        size: "512x512",
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Failed to genetate Profile Picture.", error);
    throw error;
  }
};

module.exports = { generateProfilePic };
