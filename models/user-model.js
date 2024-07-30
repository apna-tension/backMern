const mongoose = require("mongoose");

//? import bcryptjs
const bcrypt = require("bcryptjs");

//? import jsonwebtoken
const jwt = require("jsonwebtoken"); // jwt generate token from jsonwebtoken object in browser environment (https://github.com/auth0/node-jsonwebtoken)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//? secure the password with the help of bcryptjs

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    next(err);
  }
});

//? compare the password with the help of bcryptjs
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.error(err);
  }
};

// Defination of Json Web Token :
// JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.
// The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.
// JWTs are always signed with a secret key or a public/private key pair using HMAC, RSA, or ECDSA

userSchema.methods.generateToken = async function () {
  try {
    // const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
    //   expiresIn: "7d",
    // });
    const token = await jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    return token;
  } catch (err) {
    console.error(err);
  }
};




const User = mongoose.model("User", userSchema); // mongoose.model() method takes two arguments, the first one is the name of the model and the second one is the schema of the model.

module.exports = User;
