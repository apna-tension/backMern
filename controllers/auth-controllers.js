const User = require("../models/user-model");
// const bcrypt = require("bcryptjs");

// ----------------------------------------------------------------
// ----------------------------------------------------------------
//  HOME PAGE LOGIC ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const home = async (req, res) => {
  try {
    res.status(200).send("Hello World!");
  } catch (err) {
    console.log(err);
  }
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
//  REGISTER LOGIC ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const register = async (req, res) => {
  try {
    let { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      console.log("Email already exists");
      return res.status(400).json({ message: "Email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    res.status(201).json({
      message: "User Registration Process successfully",
      token: await userCreated.generateToken(),
      userID: userCreated._id.toString(),
    });
  } catch (err) {
    console.log(err);
  }
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
//  LOGIN LOGIC ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);
    if (user) {
      res.status(200).json({
        message: "User Login successfully",
        token: await userExist.generateToken(),
        userID: await userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json("Internal server error : " + err);
  }
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
//  USER Logic : to send user data ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json(userData);
  } catch (err) {
    res.status(500).json("Internal server error : " + err);
  }
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
//  EXPORTING ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

module.exports = { home, register, login, user };
