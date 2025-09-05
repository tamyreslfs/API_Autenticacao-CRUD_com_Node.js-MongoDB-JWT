const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.get("/me", auth, authController.me);

module.exports = router;
