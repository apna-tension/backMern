const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Invalid" });
  }
  console.log("Token: ", token);

  const jwtToken = token.replace("Bearer", "").trim();
  console.log("JWT Token: ", jwtToken);

  try {
    const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);

    // if you don't want to send the password in the response
    const userData = await User.findOne({ _id: decoded.userId }).select({ password: 0, });

    req.user = userData;
    req.token = token;
    req.userId = userData._id;
    next();
  } catch (error) {
    console.log("Error: ", error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
