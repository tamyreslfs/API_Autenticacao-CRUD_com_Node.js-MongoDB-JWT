const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.empty": "Nome é obrigatório",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email inválido",
    "string.empty": "Email é obrigatório",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Senha deve ter ao menos 6 caracteres",
    "string.empty": "Senha é obrigatória",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email inválido",
    "string.empty": "Email é obrigatório",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Senha deve ter ao menos 6 caracteres",
    "string.empty": "Senha é obrigatória",
  }),
});

module.exports = { registerSchema, loginSchema };
