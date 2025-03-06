const axios = require("axios");
const {
  OPENAI_API_KEY,
  OPENAI_API_URL,
  HF_API_TOKEN,
  HF_API_URL,
} = require("../config/serverConfig");

class GenerateProfile {
  async generateProfilePic(desc) {
    try {
      console.log("inside the service : ", desc.description);
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: "dall-e-3",
          prompt: desc.description,
          n: 1,
          size: "1024x1024",
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
      console.error(
        "Failed to generate Profile Picture:",
        error.response?.data || error.message
      );
      throw new Error("Profile picture generation failed.");
    }
  }

  async huggingFaceGenerateProfile(prompt) {
    const headers = {
      Authorization: `Bearer ${HF_API_TOKEN}`,
    };
    try {
      console.log("Prompt : ", prompt);
      const response = await axios.post(
        HF_API_URL,
        { inputs: prompt },
        { headers, responseType: "arraybuffer" }
      );
      return response;
    } catch (error) {
      console.log("Something went wrong in the service layer.", error);
      throw { error };
    }
  }
}

module.exports = GenerateProfile;
