const GenerateProfile = require("../services/profile-service");

const generateProfile = new GenerateProfile();

const generateProfilePic = async (req, res) => {
  try {
    console.log("inside the controller : ", req.body);
    const response = await generateProfile.generateProfilePic(req.body);

    if (
      !response ||
      !response.data ||
      !response.data.data ||
      !response.data.data[0]
    ) {
      throw new Error("Invalid response from OpenAI");
    }

    const imageUrl = response.data.data[0].url;
    res.status(201).json({
      data: imageUrl,
      success: true,
      message: "Successfully generated the profile picture.",
      error: {},
    });
  } catch (error) {
    console.error("Error generating profile picture:", error);
    res.status(500).json({
      data: {},
      success: false,
      message: "Unable to generated the profile picture.",
      error: error.message || error,
    });
  }
};

const huggingFaceGeneratePic = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  try {
    const response = await generateProfile.huggingFaceGenerateProfile(prompt);
    res.set("Content-Type", "image/png");
    res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error generating image:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      message: "Error generating image",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  generateProfilePic,
  huggingFaceGeneratePic,
};
