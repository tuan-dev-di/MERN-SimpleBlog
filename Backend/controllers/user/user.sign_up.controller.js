const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../../models/user.model");

const sign_up = async (req, res) => {
  const { username, password } = req.body;
  const username_lowercase = username.toLowerCase();

  // Check blank username and password
  if (!username_lowercase || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and Password are required",
    });
  }

  try {
    // Check user existed
    const userExisted = await User.findOne({ username_lowercase });

    if (userExisted)
      return res.status(400).json({
        success: false,
        message: `${username} has been already existed`,
      });

    if (username_lowercase.length < 7 || password.length < 7)
      return res.status(400).json({
        success: false,
        message: "Username and Password must be longer than 7 characters",
      });

    // Encrypted password and Save new User Registered
    const hashPassword = await argon2.hash(password);
    const newUser = new User({
      username: username_lowercase,
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
