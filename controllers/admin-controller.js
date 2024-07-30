const User = require("../models/user-model");
const Contact = require("../models/contact-model");


// for all users in the database
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found"});
    }
    res.status(200).json(users);
  } catch (err) {
    // res.status(500).json("Internal server error : " + err);
    next(err);
  }
};


// for all the contacts in the database

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found"});
    }
    res.status(200).json(contacts);
  } catch (err) {
    // res.status(500).json("Internal server error : " + err);
    next(err);
  }
}

module.exports = {getAllUsers, getAllContacts};