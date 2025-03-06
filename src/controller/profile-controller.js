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

module.exports = {
  generateProfilePic,
};
