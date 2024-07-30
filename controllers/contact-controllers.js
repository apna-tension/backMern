const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  try {
    const { username, email, message } = req.body;
    const contact = await Contact.create({ username, email, message });
    // res.status(201).json({ message: "Contact added successfully" });
    res.status(201).json({
      message: "Contact request added successfully",
      token: await contact.generateToken(),
      userID: await contact._id.toString(),
    });
  } catch (err) {
    res.status(500).json("Internal server error : " + err);
  }
};

module.exports = contactForm;
