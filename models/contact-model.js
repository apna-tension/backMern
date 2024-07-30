const { Schema, model } = require("mongoose");

//? import jwt
const jwt = require("jsonwebtoken");

const contactSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

// generates token for user
contactSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY,
      { expiresIn: "7 days" }
    );
    return token;
  } catch (err) {
    console.error(err);
  }
};



//? create a contact model and add the contact
const Contact = model("Contact", contactSchema);

module.exports = Contact;
