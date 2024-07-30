const express = require("express");

const router = express.Router();
const contactForm = require("../controllers/contact-controllers");

const {contactSchema} = require("../validators/auth-validator");
const {validate} = require("../middlewares/validate-middlewares");


router.route("/").post(validate(contactSchema), contactForm);

module.exports = router;
