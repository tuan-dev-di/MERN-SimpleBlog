const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../../models/user.model");

const sign_in = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({
      success: false,
      message: "Username and Password are required",
    });

  try {
    const user = await User.findOne({ username });

    // Check and Find the user is existing in the database
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Username or Password is invalid",
      });

    // Check password
    const passwordCorrect = await argon2.verify(user.password, password);
    if (!passwordCorrect)
      return res.status(400).json({
        success: false,
        message: "Username or Password is incorrect",
      });

    // Return token
    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.Access_Token
    );

    return res.status(200).json({
      success: true,
      message: `Sign-In Successfully: Welcome - ${username}`,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `${error.message} - Internal Server Error`,
    });
  }
};

module.exports = { sign_in };
