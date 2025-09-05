const express = require("express");
const router = express.Router();

const { registerSchema, loginSchema } = require('../validation/authSchemas');
const validate = require("../middlewares/validate");
const authController = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");

// Registro com validação
router.post("/register", validate(registerSchema), authController.register);

// Login com validação
router.post("/login", validate(loginSchema), authController.login);

// Refresh token (sem validação)
router.post("/refresh", authController.refresh);

// Rota do usuário autenticado
router.get("/me", auth, authController.me);

module.exports = router;
