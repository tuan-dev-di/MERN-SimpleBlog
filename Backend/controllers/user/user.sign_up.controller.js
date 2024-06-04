const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../../models/user.model");
const usernameValidation = "./user.validation.controller.js";

const sign_up = async (req, res) => {
  const { username, password } = req.body;

  const usernameRegexPattern = /^[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*$/;
  const usernameValid = usernameRegexPattern.test(username);
  // const usernameValid = username.match(usernameRegex);
  console.log("Username: " + username);
  console.log("Username Valid: " + usernameValid);

  // Check Username is a empty string
  if (!username)
    return res.status(400).json({
      success: false,
      message: "Username is required",
    });

  // Check length of Username between 7 and 25 characters
  if (username.length < 7 || username.length > 25)
    return res.status(400).json({
      success: false,
      message: "Username must between 7 and 25 characters",
    });

  // Check Username is match with Regex pattern
  if (usernameValid == false)
    return res.status(400).json({
      success: false,
      message: "Username is not match with Regex Pattern",
    });

  try {
    // Check user existed
    const userExisted = await User.findOne({ username });

    if (userExisted)
      return res.status(400).json({
        success: false,
        message: `${username} has been already existed`,
      });

    // Encrypted password and Save new User Registered
    const hashPassword = await argon2.hash(password);
    const newUser = new User({
      username: username,
      password: hashPassword,
    });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.Access_Token
    );

    return res.status(200).json({
      success: true,
      message: `Registered Successfully: Username - ${username}`,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { sign_up };
