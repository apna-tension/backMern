const express = require("express");
const adminControllers = require("../controllers/admin-controller");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminControllers.getAllUsers);
router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminControllers.getAllContacts);

module.exports = router;
